import type { Entry, Language } from '@/types/dictionary';
export function normalize(value: string) { return value.normalize('NFKD').replace(/\p{M}/gu, '').replace(/[\u200c\u200d]/g, '').toLocaleLowerCase().replace(/\s+/g, ' ').trim(); }
export function wordKey(entry: Entry) { return `${normalize(entry.balochi_native)}|${normalize(entry.english)}`; }
interface IndexedEntry { entry: Entry; fields: Record<Exclude<Language, 'all'>, string>; }
export function buildSearchIndex(entries: Entry[]): IndexedEntry[] { return entries.filter(e => e.verification_status !== 'rejected').map(entry => ({ entry, fields: { english: normalize(entry.english), balochi_native: normalize(entry.balochi_native), urdu: normalize(entry.urdu), roman_balochi: normalize(`${entry.roman_balochi} ${entry.roman_balochi_alternatives}`) } })); }
export function searchIndex(index: IndexedEntry[], query: string, language: Language = 'all', category = ''): Entry[] {
 const needle = normalize(query);
 return index.filter(({ entry, fields }) => (!category || entry.category === category) && (!needle || (language === 'all' ? Object.values(fields) : [fields[language]]).some(value => value.includes(needle)))).sort((a, b) => {
 const score = (item: IndexedEntry) => Object.values(item.fields).some(f => f === needle) ? 0 : Object.values(item.fields).some(f => f.startsWith(needle)) ? 1 : 2;
 return (needle ? score(a) - score(b) : 0) || a.entry.english.localeCompare(b.entry.english);
 }).map(item => item.entry);
}
export function dayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
export function dailyEntries(entries: Entry[], count = 5) { const pool = entries.filter(e => e.verification_status !== 'rejected').sort((a, b) => a.entry_id.localeCompare(b.entry_id)); const hash = [...dayKey()].reduce((n, c) => n * 31 + c.charCodeAt(0), 0) >>> 0; return pool.length ? Array.from({ length: Math.min(count, pool.length) }, (_, i) => pool[(hash + i) % pool.length]) : []; }
