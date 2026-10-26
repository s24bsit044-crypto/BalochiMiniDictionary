import type { Entry } from '@/types/dictionary';
import { CATEGORIES } from '@/constants/categories';
// User-supplied master sheet. No linguistic verification is implied.
const GROUPS = [
`Watermelon|ھَبُند / شَپتَلوگ|Habund / Shaptalog|تربوز
Melon|گۆندُمگ|Gondumag|خربوزہ
Onion|پِیَاز|Piyaz|پیاز
Garlic|ثۆم|Thoom|لہسن
Ginger|اَدَرَک|Adarak|ادرک
Yogurt / Curds|مَستَگ|Mastag|دہی
Lassi / Whey|دۆگ|Dog|لسی
Meat Curry|نارُشت / گوشتِ آپ|Narusht / Gosht-e-aap|سالن / شوربہ
Honey|شَھد / مَکَسِ آپ|Shahd / Makas-e-aap|شہد
Egg|ھیک|Heek|انڈا
Flour|آرت|Aart|آٹا
Dry Bread Crust|کاپۆت|Kapot|خشک روٹی کا ٹکڑا
Meat Skewer|سِیخۆک|Seekhok|سیخ کباب
Fried Fish|ماھیگِ بِرّگ|Maheeg barrag|تلی ہوئی مچھلی
Lentils|دال|Daal|دال
Pickle|اَچار|Achar|اچار
Pomegranate|انار|Anaar|انار
Apple|سێب|Seb|سیب
Banana|کێلَہ|Kelah|کیلا
Orange|مَلتَہ|Maltah|مالٹا / سنترہ
Lemon|لِمبو|Limbo|لیموں
Black Pepper|سِیاہ مِرچ|Siyah mirch|کالی مرچ
Red Chili|سُھرێن مِرچ|Sohren mirch|سرخ مرچ
Turmeric|زردچۆب|Zardchob|ہلدی
Sugar Candy|نَبات|Nabaat|مصری
Sweets|وشّی / مِٹھائی|Vashi / Mithai|مٹھائی
Broth / Soup|شۆروا|Shorwa|یخنی / شوربہ
Tea Leaves|چاہِ تاک|Chaah-e-taak|چائے کی پتی
Wheat Grain|گَلَّہ|Gallah|گندم کا دانہ
Apricot|زَردالُو|Zardaloo|خوبانی`,
`Mat / Carpet|کِپِن / تَکَر|Kipin / Takar|چٹائی / قالین
Pillow|بالِشت|Balisht|تکیہ
Blanket / Quilt|لێپ|Lep|لحاف / کمبل
Needle|سۆچن|Sochan|سوئی
Thread|تَاگِر / دَرۆگ|Taagir / Darog|دھاگا
Scissors|کَیچی|Kaichi|قینچی
Knife|کارِچ|Karich|چھری / چاقو
Axe|تَبَر|Tabar|کلہاڑی
Rope|زِھ / چِلّہ|Zih / Chillah|رسی
Broom|رۆپِنک / رۆپَگ|Ropink / Ropag|جھاڑو
Large Cooking Pot|دِگ|Dig|دیگ / پتیلا
Spoon|چَمچَگ|Chamchag|چمچ
Bowl|کَاسَہ|Kaasag|پیالہ / کاسہ
Mirror|اِسپِت / آئینَہ|Ispit / Aineh|آئینہ
Comb|شَانوک|Shanok|کنگھی
Soap|صابون|Saboon|صابون
Jug / Pitcher|جَام / لۆٹَہ|Jaam / Lota|جگ / لوٹا
Bucket|بالٹی|Balti|بالٹی
Trunk / Chest|سَندۆک|Sandok|صندوق
Lock|کُپُل|Kupul|تالا
Lamp / Lantern|چِراگ|Chiraag|چراغ / دیا
Matchstick|گِبرِت|Gibrit|ماچس
Fan|پَکّھگ|Pakhag|پنکھا
Roof|بَان|Baan|چھت
Wall|لِکّۆک / کَنڈ|Likkok / Kand|دیوار
Window|کِڑکِی|Kidki|کھڑکی
Floor|جَھل / ڈَن|Jhal / Dahn|فرش
Table|مێز|Mez|میز
Tea Cup|پِیالی|Piyali|پیالی
Hammer|چَکُش|Chakush|ہتھوڑا`,
`Lion|شێر|Sher|شیر
Leopard / Tiger|پلَنگ|Palang|چیتا / چیتے
Bear|مِم|Mim|ریچھ
Fox|روباہ|Robaah|لومڑی
Jackal|تۆرَگ|Torag|گیدڑ
Rabbit|خرگۆش|Khargosh|خرگوش
Mouse / Rat|مۆشک|Moshk|چوہا
Elephant|پِیل|Peel|ہاتھی
Monkey|شَادو|Shadoo|بندر
Deer / Gazelle|آسکوگ|Aaskog|ہرن
Wild Boar|خُوک|Khook|جنگلی سور
Crow|گوراگ|Goraag|کوا
Pigeon|کپۆت|Kapot|کبوتر
Eagle / Falcon|دَال / بَاز|Daal / Baaz|عقاب / باز
Owl|بُمب|Bumb|الو
Sparrow|جِنجِر|Jinjir|چڑیا
Peacock|طاؤس / مُرگِ زِبا|Taos / Murg-e-ziba|مور
Duck|بَطَخ|Batakh|بطخ
Rooster|کُرۆس|Kuros|مرغا
Hen|مُرگی|Murgi|مرغی
Housefly|مَکَس|Makas|مکھی
Mosquito|شَامَگ|Shaamag|مچھر
Honeybee|مَکَسِ اَنگُبین|Makas-e-angubeen|شہد کی مکھی
Ant|مۆر|Moor|چیونٹی
Spider|تَنَدو|Tanadoo|مکڑی
Scorpion|گُوِمّ|Gwimm|بچھو
Lizard|کرپُاس|Karpas|چھپکلی
Frog|پُگ|Pug|مینڈک
Crocodile|گَنو|Gano|مگرمچھ
Butterfly|بَاپۆک|Baapok|تتلی`,
`Date Palm Tree|مَچ|Mach|کھجور کا درخت
Leaf|تاک|Taak|پتا
Branch / Twig|ٹَالَگ / شَاخ|Taalag / Shaakh|ٹہنی / شاخ
Root|بَنگُل / رِشگ|Bangul / Rishg|جڑ
Seed|بێج / بَج|Beej / Baj|بیج
Fruit|بَر|Bar|پھل
Grass|کاہ|Kaah|گھاس
Thorn|کَنتَگ|Kantag|کانٹا
Garden|بَاگ|Baag|باغ
Harvest / Crop|چِنَگ|Chinag|فصل / کٹائی
Mud / Clay|گِل|Gil|مٹی / کیچڑ
Sand|ریک|Rek|ریت
Stone / Rock|سنگ|Sang|پتھر
Forest|جَنگَل|Jangal|جنگل
Wood / Timber|دار|Daar|لکڑی
Straw / Hay|کاہ-و-کُٹ|Kaah-o-kutt|بھوسہ
Cotton|پَمپَک|Pampak|کپاس / روئی
Wheat Spike|گَلَّہِ تاک|Gallah-e-taak|گندم کی بالی
Wild Bush|ڈَنگُک|Danguk|جھاڑی
Willow Tree|گِز|Giz|گز / بید کا درخت
Acacia Tree|کُور|Koor|کیکر
Tree Bark|پۆست|Post|درخت کی چھال
Blossom / Flower Bud|پُلّی|Pulli|کلیاں / شگوفہ
Orchard|بَاگِتَین|Baagitain|پھلوں کا باغ
Sapling|نۆکێن دِرَچک|Noken dirachk|نیا پودا`,
`Century|سَدی|Sadi|صدی
Decade|دَہی|Dahi|دہائی
Midnight|نِیمپَشپ|Neemshap|آدھی رات
Midday / Noon|نِیمرۆچ|Neemroch|دوپہر
Dawn / Sunrise|سُبَھِ روچ|Subah-e-roch|پو پھوٹنا / طلوع
Sunset|ڕۆچ کَپَگ|Roch kapag|غروب آفتاب
Spring|بَہار|Bahaar|بہار
Autumn / Fall|پَچَء / اَنگور|Pacha / Angoor|خزان
Hour|سَاعت|Sa'at|گھنٹہ
Minute|مِنَٹ|Minat|منٹ
Second|سیکنڈ|Second|سیکنڈ
Moment|دَمُک|Damuk|لمحات / لمحہ
Daily|رۆچَئی|Rochai|روزانہ
Monthly|مَاهَئی|Maahai|ماہانہ
Yearly|سَالَئی|Saalai|سالانہ
Past|گوستَگێن|Gostagen|ماضی / گزرا ہوا
Future|آئِندَہ|Aaindah|مستقبل
Early|زُود|Zood|جلدی / سویرے
Late|دێر|Deer|دیر / تاخیر
Always|مُدام|Mudaam|ہمیشہ
Never|ھِچّ بَر|Hich bar|کبھی نہیں
Sometimes|بَزێن بَر|Bazen bar|کبھی کبھی
Often|گێشترێن وھد|Geshterin wahd|اکثر
Age / Era|دور|Daur|دور / عہد
Lifetime|عُمر|Omar|عمر / زندگی`,
`Shirt / Tunic|پَرَاہَن|Parahan|قمیض / کرتا
Salwar / Trousers|شَلوار|Shalwar|شلوار
Turban|پَگ / پَگڑی|Pag / Pagdi|پگڑی
Shawl / Wrap|چَادَر|Chaadar|چادر
Cap|ٹۆپی|Topi|ٹوپی
Pocket|کِیسَہ|Keesah|جیب
Button|بَٹَن|Batan|بٹن
Sleeve|آستین / بَالُک|Aasteen / Baaluk|آستین
Belt|کَمَربَند|Kamarband|بیلٹ / کمر بند
Ring|اَنگُشتَری / مُہرۆک|Angushtari / Muhrok|انگوٹھی
Necklace|ھَار|Haar|ہار / مالا
Bangle / Bracelet|کَاڑَہ / بَازُوبَند|Kada / Baazooband|چوڑی / کڑا
Earrings|دُرّ|Durr|بالیاں / جھمکے
Anklet|پَایَل|Payal|پازیب / پائل
Balochi Needlework|دۆچ|Doch|بلوچی کڑھائی
Handbag / Pouch|کِیستَگ|Keestag|تھیلا / ہینڈ بیگ
Veil / Hijab|بُرقَع|Burqa|نقاب / برقع
Umbrella|چَتر|Chatr|چھتری
Socks|جۆرَاب|Joraab|جرابیں
Gloves|دَستَوانَہ|Dastwaanah|دستانے
Traditional Sandals|چَوّاٹ|Chawwat|بلوچی روایتی چپل
Mirror Embroidery|اِسپِتِ دۆچ|Ispit-e-doch|شیشے کی کڑھائی
Gold Ornament|سُھرِ زێوَر|Sohr-e-zeewar|سونے کا زیور
Silk Fabric|اِبرێشَم|Ibresham|ریشم
Spool of Thread|نَلّ|Nall|نلکی`,
`Shoulder|کپَگ|Kapag|کاندھا
Chest|سِینَہ|Seenah|چھاتی / سینہ
Back|پُشت|Pusht|پیٹھ / پشت
Waist|کَمَر|Kamar|کمر
Knee|گۆڈ|God|گھٹنا
Heel|پَاڈِک|Paadik|ایڑی
Lip|لُنٹ|Lunt|ہونٹ
Cheek|رُپت / گَلّ|Rupt / Gall|گال
Chin|چَنَک|Chanak|ٹھوڑی
Forehead|تێنَگ|Tenag|پیشانی / ماتھا
Moustaches|بۇرُت|Burut|مونچھیں
Beard|رِش / دِیم|Rish / Deem|داڑھی
Throat|گُلۆک|Gulok|گلا / حلق
Elbow|آرِش|Aarish|کہنی
Thumb|بَرزی کِلِک|Barzi kilik|انگوٹھا
Palm|دَستِ کَپ|Dast-e-kap|ہتھیلی
Wrist|بَند|Band|کلائی
Nail|ناخُن / نۆک|Nakhun / Nok|ناخن
Liver|جِگر|Jigar|جگر
Kidney|گُردَگ|Gurdag|گردہ
Brain|مَغز|Maghz|دماغ
Skin|پۆست|Post|جلد / کھال
Vein|رَگ|Rag|رگ
Rib|پَہلو|Pahloo|پسلی
Belly Button|نَاف|Naaf|ناف`,
`Island|جَزِیرَہ|Jazeerah|جزیرہ
Desert|پَٹ|Patt|صحرا / ریگستان
Valley|جَھلَوان / کَورِ ڈَن|Jhalawan / Kaur-e-dahn|وادی
Cave|غَار / کَپَٹ|Ghaar / Kapat|غار
Waterfall|آپِ کپَگ|Aap-e-kapag|آبشار
Hill / Hillock|کۆہۆک|Kohok|پہاڑی
Dust|دُول / لِڑ|Dool / Lidd|دھول / گرد
Mud Puddle|لِچ|Lich|کیچڑ
Wave|چَوّ|Chaww|لہر
Coast / Beach|زِرِ دَپ|Zir-e-dap|ساحل
Horizon|اَزمانِ دَپ|Azman-e-dap|افق
Lightning|بِرَک|Birak|بجلی (کڑکنے والی)
Thunder|گُرّگ / گوارِش|Gurrag / Gwarish|بادل کی گرج
Earthquake|زَلزَلَہ|Zalzalah|زلزلہ
Flood|آپِ سێل|Aap-e-sel|سیلاب
Glacier / Snow Peak|بَرپ|Barp|برف کا پہاڑ / گلیشیر
Fog / Mist|مێڑ|Med|دھند / کُہر
Dew|شَبنَم|Shabnam|شبنم / اؤس
Soft Breeze|کَسێن گوات|Kasen gwaath|ہلکیں ہوا
Storm|طُوفَان|Toofan|طوفان
Water Well|چَاه|Chaah|کنواں
Oasis|سَبزَہ‌جَاہ|Sabzah-jaah|واحت
Canal|نَہر|Nahr|نہر
Field Boundary|بَنّ|Bann|مینڈ / حد
Open Plain|ڈَنّ|Dahn|میدان / سطح مرتفع`,
`To learn|دَر بَرگ|Dar barag|سیکھنا
To teach|دَر دَیَگ|Dar deyag|سکھانا
To build / make|جۆر کَنَگ|Jor kanag|بنانا / تعمیر کرنا
To break|پرۆشَگ|Proshag|توڑنا
To cut|بُُرَگ|Burag|کاٹنا
To wash|شُستَگ|Shustag|دھونا
To clean|پَاک کَنَگ|Paak kanag|صاف کرنا
To open|پَچ کَنَگ|Pach kanag|کھولنا
To close|بَند کَنَگ|Band kanag|بند کرنا
To search|پۆل کَنَگ|Pol kanag|تلاش کرنا
To find|گِندَگ|Gindag|پانا / ڈھونڈنا
To lose|گار کَنَگ|Gaar kanag|کھونا
To fly|بال کَنَگ|Baal kanag|اڑنا
To swim|آپَا جَنَگ|Aapa janag|تیرنا
To fight|مێڑَگ|Medag|لڑنا
To play|گَازی کَنَگ|Gaazi kanag|کھیلنا
To sing|صَوت جَنَگ|Sawt janag|گانا
To dance|نَاچ کَنَگ|Naach kanag|ناچنا
To drive|چَلائێنَگ|Chalainag|چلانا (گاڑی)
To cook|پَچَگ|Pachag|پکانا
To boil|جۆش دَیَگ|Josh deyag|ابالنا
To fry|بِرَّگ|Barrag|تلنا
To carry|بَرگ|Barag|لے جانا
To bring|آرَگ|Aarag|لانا
To send|دَیم دَیَگ|Daim deyag|بھیجنا
To receive|گِرَگ|Girag|وصول کرنا
To ask|پُرس کَنَگ|Purs kanag|پوچھنا
To answer|پَسَّو دَیَگ|Passaw deyag|جواب دینا
To help|کُمَک کَنَگ|Kumak kanag|مدد کرنا
To forget|بێشۆش بَگ|Beshosh bag|بھولنا
To remember|یَاد کَنَگ|Yaad kanag|یاد رکھنا
To think|فِکر کَنَگ|Fikr kanag|سوچنا
To understand|سَرپَد بَگ|Sarpad bag|سمجھنا
To count|حِسَاب کَنَگ|Hisaab kanag|گننا
To touch|دَست جَنَگ|Dast janag|چھونا`,
`Soft|نَرم|Narm|نرم
Hard|سَخت|Sakht|سخت / کٹھن
Smooth|صَاف|Saaf|ہموار / چکنا
Rough|کَرَک|Karak|کھردرا
Wet|تَر / تَرَنگ|Tar / Tarang|گیلا / تر
Dry|ھُشک|Hushk|خشک
Full|پُر|Pur|بھرا ہوا
Empty|ھَلی / خَالی|Hali / Khali|خالی
Wide|پَراہ|Paraah|کشادہ / چوڑا
Narrow|تَنْگ|Tang|تنگ
Deep|جُهل|Jhul|گہرا
Shallow|بَارِگ|Barig|کم گہرا
Loud Voice|بَرزێن توار|Barzen twaar|اونچی آواز
Quiet / Silent|چُپ|Chup|خاموش
Brave|مِڑاوِش|Midawish|بہادر
Cowardly|تُرسۆک|Tursok|بزدل
Kind|مِہرَبَان|Mehrbaan|مہربان
Cruel|ظَالِم|Zalim|ظالم
Clever|زَانۆک|Zanok|چالاک / ہوشیار
Foolish|گَنۆک|Ganok|بیوقوف / پاگل
Healthy|دُرَاہ|Duraah|تندرست
Sick|نَادُرَاہ|Naaduraah|بیمار
Blind|کۆر|Kor|اندھا
Deaf|کَر|Kar|بہرا
Mute|بَبۆک|Babok|گونگا
Alive|زِندَگ|Zindag|زندہ
Dead|مُرتَگێن|Murtagen|مردہ
Free|اَزاد|Azaad|آزاد
Busy|مَشغُول|Mashghool|مصروف
Easy|اَسَان / اَرزَان|Asaan / Arzaan|آسان`,
`Tailor|دۆچۆک|Dochok|درزی
Blacksmith|اَسن‌کار|Asnkaar|لوہار
Carpenter|دارتَاش|Daartaash|بڑھئی
Weaver|گُدبَاف|Gudbaaf|بنکر / جولاہا
Goldsmith|سُھرکار|Sohrkaar|سنار
Mason / Builder|جۆرۆک|Jorok|معمار
Barber|ھَجّام|Hajjam|نائی
Potter|کُلَالَک|Kulalak|کمہار
Poet|شَاعِر|Sha'ir|شاعر
Leader / Chief|سَردَار / واجہ|Sardar / Wajah|قائد / سردار
Judge|قَاضِی|Qazi|منصف / قاضی
Guard / Sentinel|پاسبَان|Paasbaan|چوکیدار
Writer|نبِیسۆک|Nabisok|مصنف
Painter|رنگ‌کار|Rangkaar|رنگ ساز / مصور
Merchant|سوداگَر|Sodagar|تاجر
Servant|خِدمَت‌کار|Khidmatkaar|خادم
Singer|صَوتِی|Sawti|گلوکار
Musician|سَازِندَہ|Sazindah|سازندہ
Neighbor|ھَمسَایَگ|Hamsayag|پڑوسی
Citizen|بَاشِندَہ|Bashindah|شہری
King|بَادشَاہ|Baadshah|بادشاہ
Queen|رَانِی|Rani|ملکہ
Driver|ڈرَائِوَر|Driver|ڈرائیور
Commander|سَپَہ‌سَالار|Sapah-salar|سپاہ سالار
Warrior|مِڑۆک|Midok|جنگجو`,
`Farewell / Bon Voyage|سِپِر بَئیر|Sipar baer|سفر مبارک / الوداع
Of Course|الَبتَّہ|Albattah|یقیناً / بالکل
Congratulations|مُبَارَک بَات|Mubarak baat|مبارک ہو
God Bless You|اَللّہ تی نِگَہبَان بَات|Allah tey nagahbaan baat|اللہ آپ کا حامی و ناصر ہو
Excuse Me|مَنا بَخش|Mana baksh|معاف کیجیے گا
No Problem|ھِچ گَپّ نِنت|Hich gapp nint|کوئی بات نہیں
Don't Worry|فِکر مَکَن|Fikr makan|فکر نہ کریں
Hurry Up|زُود بَگ|Zood bag|جلدی کرو
Be Careful|ھۆشیَار بَات|Hoshiyaar baat|محتاط رہیں
Listen to Me|مَنِی گَپَّا گۆش دَار|Mani gappa gosh daar|میری بات سنو
Look Here|اِدا چَار|Ida chaar|ادھر دیکھو
Come In|اَندر بَیَایَا|Andar bayaya|اندر آ جائیے
What's Up?|چے احوَال اِنت؟|Che ahwaal int?|کیا حال چال ہے؟
Good Luck|مَے دُعَا تی گۆن اِنت|May dua tey gon int|ہماری دعا آپ کے ساتھ ہے
Really?|بَلکِن؟|Balkin?|واقعی؟
Quiet Down|چُپ بَنِند|Chup banind|خاموش ہو جاؤ
Well Done|واش کُتَت|Wash kutat|شاباش / بہت خوب
See You Later|پَدَا گِندِین|Pada gindeen|پھر ملیں گے
Take Care|وتی خَیَالِ کن|Wati khayal-e-kan|اپنا خیال رکھیں
Welcome|واش آتکے|Wash aatke|خوش آمدید`
];
let id = 0;
export const SEED_ENTRIES: Entry[] = GROUPS.flatMap((group, index) => group.split('\n').map(line => {
 const [english, balochi_native, roman, urdu] = line.split('|');
 const [roman_balochi, ...alternatives] = roman.split(' / ');
 return { entry_id: `master-${String(++id).padStart(3, '0')}`, english, balochi_native, roman_balochi, roman_balochi_alternatives: alternatives.join('; '), urdu, category: CATEGORIES[index].name, source: 'User-provided 325 New Words Master Sheet', verification_status: 'needs review', notes: 'User-supplied translation; not independently verified. Dialect and regional spelling have not been established.' };
}));
