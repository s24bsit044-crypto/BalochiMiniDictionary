import os
import json
import random
import re
import pandas as pd
import streamlit as st

# Page Configuration MUST be the very first Streamlit command called
st.set_page_config(
    page_title="Balochi Mini Dictionary",
    page_icon="📖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for UI styling and RTL Arabic/Urdu/Balochi typography
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');
    
    .balochi-text {
        font-family: 'Noto Naskh Arabic', 'Noto Nastaliq Urdu', serif;
        font-size: 1.8rem;
        direction: rtl;
        text-align: right;
        color: #0f766e;
        line-height: 1.8;
    }
    .urdu-text {
        font-family: 'Noto Naskh Arabic', 'Noto Nastaliq Urdu', serif;
        font-size: 1.2rem;
        direction: rtl;
        text-align: right;
        color: #374151;
        line-height: 1.6;
    }
    .badge-verified {
        background-color: #d1fae5;
        color: #065f46;
        padding: 0.2rem 0.5rem;
        border-radius: 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .badge-review {
        background-color: #fef3c7;
        color: #92400e;
        padding: 0.2rem 0.5rem;
        border-radius: 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .badge-rejected {
        background-color: #fee2e2;
        color: #991b1b;
        padding: 0.2rem 0.5rem;
        border-radius: 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)


# Text Normalization Utilities
def normalize_arabic(s):
    if not s or pd.isna(s):
        return ""
    s = str(s)
    # Strip diacritics / tashkeel
    s = re.sub(r'[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u200c\u200d]', '', s)
    # Standardize letter variants
    s = re.sub(r'[يىئێېۍےۓ]', 'ی', s)
    s = re.sub(r'ك', 'ک', s)
    s = re.sub(r'[هھۃة]', 'ہ', s)
    s = re.sub(r'[ۆۊ]', 'و', s)
    s = re.sub(r'[أإآ]', 'ا', s)
    return re.sub(r'\s+', ' ', s).strip()


def normalize_latin(s):
    if not s or pd.isna(s):
        return ""
    s = str(s).lower()
    s = re.sub(r'ey|ei|ai|ay', 'e', s)
    s = re.sub(r'aa', 'a', s)
    s = re.sub(r'ee|ii', 'i', s)
    s = re.sub(r'oo|uu|ou', 'u', s)
    s = re.sub(r'([^a-z0-9])', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


# Load Dataset into Session State safely with relative path resolution
if "dictionary_data" not in st.session_state:
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "balochi_dictionary_dataset.csv")
        df = pd.read_csv(file_path)
        # Clean column names (strip BOM, quotes, and whitespace)
        df.columns = [c.replace('\ufeff', '').replace('"', '').strip() for c in df.columns]
        st.session_state["dictionary_data"] = df
    except Exception as e:
        st.error(f"Could not load balochi_dictionary_dataset.csv: {e}")
        st.session_state["dictionary_data"] = pd.DataFrame(columns=[
            "entry_id", "balochi_native", "urdu", "english", "roman_balochi",
            "roman_balochi_alternatives", "category", "notes", "source", "verification_status"
        ])

if "favorites" not in st.session_state:
    st.session_state["favorites"] = []

df = st.session_state["dictionary_data"]

# Sidebar Navigation
st.sidebar.title("📖 Balochi Mini Dictionary")
st.sidebar.caption("Offline Multilingual Dictionary")

nav_option = st.sidebar.radio(
    "Navigation",
    ["🔍 Search & Explore", "▦ Categories", "⭐ Favorites", "🎓 Quiz / Practice", "⚙️ Data Management"],
    index=0
)

# 1. Search & Explore
if nav_option == "🔍 Search & Explore":
    st.header("Search & Explore Entries")

    col1, col2 = st.columns([3, 1])
    with col1:
        search_query = st.text_input("Search (English, Urdu, Balochi, Roman Balochi):", placeholder="Type a word...")
    with col2:
        lang_filter = st.selectbox("Search Field", ["All Languages", "English", "Urdu", "Balochi (Native)", "Roman Balochi"])

    cats = ["All Categories"] + sorted([c for c in df["category"].dropna().unique() if str(c).strip()])
    selected_cat = st.selectbox("Category Filter", cats)

    filtered_df = df.copy()

    if selected_cat != "All Categories":
        filtered_df = filtered_df[filtered_df["category"] == selected_cat]

    if search_query.strip():
        q = search_query.strip()
        q_ar = normalize_arabic(q)
        q_lat = normalize_latin(q)

        def matches(row):
            en = str(row.get("english", "")).lower()
            ur = normalize_arabic(row.get("urdu", ""))
            bal = normalize_arabic(row.get("balochi_native", ""))
            rom = normalize_latin(row.get("roman_balochi", ""))
            rom_alt = normalize_latin(row.get("roman_balochi_alternatives", ""))

            if lang_filter == "English":
                return q_lat in en
            elif lang_filter == "Urdu":
                return q_ar in ur
            elif lang_filter == "Balochi (Native)":
                return q_ar in bal
            elif lang_filter == "Roman Balochi":
                return q_lat in rom or q_lat in rom_alt
            else:
                return (q_lat in en) or (q_ar in ur) or (q_ar in bal) or (q_lat in rom) or (q_lat in rom_alt)

        mask = filtered_df.apply(matches, axis=1)
        filtered_df = filtered_df[mask]

    st.subheader(f"Results ({len(filtered_df)} entries)")

    for idx, row in filtered_df.iterrows():
        entry_id = str(row.get("entry_id", f"BAL-{idx}"))
        status = row.get("verification_status", "needs_review")
        badge_class = "badge-verified" if status == "verified" else ("badge-rejected" if status == "rejected" else "badge-review")

        with st.container():
            c_left, c_right = st.columns([3, 2])
            with c_left:
                st.markdown(f"### **{row.get('english', '')}**")
                st.markdown(f"**Roman Balochi:** `{row.get('roman_balochi', '')}`")
                if pd.notna(row.get("roman_balochi_alternatives")) and str(row.get("roman_balochi_alternatives")).strip():
                    st.caption(f"Alternatives: {row.get('roman_balochi_alternatives')}")
                st.markdown(f"<div class='urdu-text'>{row.get('urdu', '')}</div>", unsafe_allow_html=True)
                st.markdown(f"Category: **{row.get('category', 'Uncategorized')}** | <span class='{badge_class}'>{status}</span>", unsafe_allow_html=True)

            with c_right:
                st.markdown(f"<div class='balochi-text'>{row.get('balochi_native', '')}</div>", unsafe_allow_html=True)
                fav_label = "⭐ Favorited" if entry_id in st.session_state["favorites"] else "☆ Add to Favorites"
                if st.button(fav_label, key=f"btn_fav_{entry_id}_{idx}"):
                    if entry_id in st.session_state["favorites"]:
                        st.session_state["favorites"].remove(entry_id)
                    else:
                        st.session_state["favorites"].append(entry_id)
                    st.rerun()
            st.divider()

# 2. Browse Categories
elif nav_option == "▦ Categories":
    st.header("Browse Entries by Category")
    cats = sorted([c for c in df["category"].dropna().unique() if str(c).strip()])
    
    selected_c = st.selectbox("Select a category:", cats)
    if selected_c:
        cat_df = df[df["category"] == selected_c]
        st.write(f"Found **{len(cat_df)}** words in **{selected_c}**:")
        for _, row in cat_df.iterrows():
            st.markdown(f"**{row.get('english', '')}** — `{row.get('roman_balochi', '')}` | {row.get('urdu', '')} | <span class='balochi-text'>{row.get('balochi_native', '')}</span>", unsafe_allow_html=True)

# 3. Favorites Page
elif nav_option == "⭐ Favorites":
    st.header("Your Saved Words")
    fav_ids = st.session_state["favorites"]
    if not fav_ids:
        st.info("No saved words yet. Click '☆ Add to Favorites' on any word in the Search tab to save it here!")
    else:
        fav_df = df[df["entry_id"].astype(str).isin(fav_ids)]
        for _, row in fav_df.iterrows():
            st.markdown(f"### **{row.get('english', '')}** (`{row.get('roman_balochi', '')}`)")
            st.markdown(f"<div class='balochi-text'>{row.get('balochi_native', '')}</div>", unsafe_allow_html=True)
            st.markdown(f"**Urdu:** {row.get('urdu', '')}")
            st.caption(f"Category: {row.get('category', '')}")
            st.divider()

# 4. Interactive Quiz
elif nav_option == "🎓 Quiz / Practice":
    st.header("Vocabulary Practice Quiz")
    if len(df) < 4:
        st.warning("At least 4 entries are required to generate a quiz.")
    else:
        quiz_sample = df.dropna(subset=["english", "balochi_native"]).sample(n=4)
        correct_item = quiz_sample.iloc[0]

        st.subheader("Choose the correct native Balochi word for:")
        st.markdown(f"## **{correct_item['english']}** ({correct_item['urdu']})")

        options = quiz_sample["balochi_native"].tolist()
        random.shuffle(options)

        choice = st.radio("Select translation:", options, key=f"q_{correct_item['entry_id']}")
        if st.button("Check Answer"):
            if choice == correct_item['balochi_native']:
                st.success("Correct! 🎉")
            else:
                st.error(f"Incorrect. The correct answer is: {correct_item['balochi_native']} ({correct_item['roman_balochi']})")

# 5. Data Management
elif nav_option == "⚙️ Data Management":
    st.header("Data Management")
    st.write(f"Total entries in active dataset: **{len(df)}**")

    st.download_button(
        label="📥 Export Dataset as CSV",
        data=df.to_csv(index=False).encode('utf-8'),
        file_name="balochi_dictionary_export.csv",
        mime="text/csv"
    )

    st.divider()
    st.subheader("Import & Merge CSV")
    uploaded_file = st.file_uploader("Upload a CSV file to append entries", type=["csv"])
    if uploaded_file is not None:
        try:
            new_df = pd.read_csv(uploaded_file)
            st.write("File Preview:", new_df.head())
            if st.button("Import & Merge Data"):
                combined_df = pd.concat([df, new_df]).drop_duplicates(subset=["english", "balochi_native"])
                st.session_state["dictionary_data"] = combined_df
                st.success("Data merged successfully!")
                st.rerun()
        except Exception as e:
            st.error(f"Error parsing CSV file: {e}")
