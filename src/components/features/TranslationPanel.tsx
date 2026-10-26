import type { Entry } from '@/types/dictionary';
interface Props { entry: Entry; }
export default function TranslationPanel({ entry }: Props) {
 return <section className="panel overflow-hidden"><h2 className="border-b px-6 py-5 text-lg font-semibold">Four ways to say it</h2><dl className="grid sm:grid-cols-2">{[{ label: 'Balochi · بلوچی', text: entry.balochi_native, lang: 'bal', rtl: true }, { label: 'Urdu · اردو', text: entry.urdu, lang: 'ur', rtl: true }, { label: 'English', text: entry.english, lang: 'en', rtl: false }, { label: 'Roman Balochi', text: entry.roman_balochi, lang: 'bal-Latn', rtl: false }].map(({ label, text, lang, rtl }) => <div key={label} className="border-b px-6 py-5 sm:odd:border-r"><dt className="eyebrow text-muted-foreground">{label}</dt><dd lang={lang} dir={rtl ? 'rtl' : 'ltr'} className={`mt-3 ${rtl ? 'arabic text-3xl text-primary' : 'text-xl font-medium'}`}>{text}</dd></div>)}</dl></section>;
}
