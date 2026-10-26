-- Equivalent SQLite schema for future native packaging. Active web storage is IndexedDB, not SQLite.
PRAGMA foreign_keys = ON;
PRAGMA user_version = 2;
CREATE TABLE dictionary_entries (
 entry_id TEXT PRIMARY KEY NOT NULL,
 balochi_native TEXT NOT NULL CHECK(length(trim(balochi_native)) > 0),
 urdu TEXT NOT NULL CHECK(length(trim(urdu)) > 0),
 english TEXT NOT NULL CHECK(length(trim(english)) > 0),
 roman_balochi TEXT NOT NULL CHECK(length(trim(roman_balochi)) > 0),
 roman_balochi_alternatives TEXT NOT NULL DEFAULT '',
 category TEXT NOT NULL,
 notes TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT '',
 verification_status TEXT NOT NULL DEFAULT 'needs review' CHECK(verification_status IN ('needs review','verified','rejected')),
 dialect TEXT, example_balochi TEXT, example_urdu TEXT, example_english TEXT, example_roman TEXT, example_source TEXT,
 word_key TEXT UNIQUE NOT NULL,
 CHECK(verification_status <> 'verified' OR length(trim(source)) > 0)
);
CREATE INDEX dictionary_category_idx ON dictionary_entries(category);
CREATE INDEX dictionary_status_idx ON dictionary_entries(verification_status);
CREATE TABLE favorites(entry_id TEXT PRIMARY KEY REFERENCES dictionary_entries(entry_id) ON DELETE CASCADE);
CREATE TABLE recent_words(entry_id TEXT PRIMARY KEY REFERENCES dictionary_entries(entry_id) ON DELETE CASCADE, visited_at TEXT NOT NULL);
CREATE TABLE preferences(key TEXT PRIMARY KEY, value_json TEXT NOT NULL);
CREATE TABLE daily_progress(day TEXT NOT NULL, entry_id TEXT NOT NULL, PRIMARY KEY(day, entry_id));
CREATE TABLE snapshots(snapshot_id TEXT PRIMARY KEY, created_at TEXT NOT NULL, data_json TEXT NOT NULL);
-- word_key is computed in application code: normalized native word + '|' + normalized English meaning.
-- Parameterized statements must be used in any native repository. No dynamic SQL is used in this web app.
