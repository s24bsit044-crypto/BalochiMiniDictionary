import type { Entry } from '@/types/dictionary';
interface Props { entry: Entry; }
export default function ExamplePanel({ entry }: Props) {
 const available = entry.verification_status === 'verified' && !!entry.example_source?.trim();
 return <section className="panel p-6"><h2 className="text-lg font-semibold">Examples in context</h2><p className="mb-5 mt-2 text-sm leading-6 text-muted-foreground">Only sourced examples from verified entries are shown.</p><dl className="space-y-4">{[{ label: 'Balochi', text: entry.example_balochi, rtl: true }, { label: 'Urdu', text: entry.example_urdu, rtl: true }, { label: 'English', text: entry.example_english }, { label: 'Roman Balochi', text: entry.example_roman }].map(e => <div key={e.label}><dt className="eyebrow text-muted-foreground">{e.label}</dt><dd dir={available && e.text && e.rtl ? 'rtl' : 'ltr'} className={`mt-2 ${available && e.text && e.rtl ? 'arabic text-xl' : 'text-sm text-muted-foreground'}`}>{available && e.text ? e.text : 'Not available yet'}</dd></div>)}</dl>{available && <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">Example source: {entry.example_source}</p>}</section>;
}
