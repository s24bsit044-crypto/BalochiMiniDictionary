import { Sunrise, ArrowRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDictionary } from '@/hooks/useDictionary';
import type { Entry } from '@/types/dictionary';
import VerificationBadge from '@/components/features/VerificationBadge';
interface Props { entry?: Entry; }
export default function WordOfDay({ entry }: Props) {
 const { toggleFavorite, personal } = useDictionary();
 return <section className="panel relative overflow-hidden bg-secondary p-6 sm:p-7"><div className="flex items-center justify-between"><p className="eyebrow flex items-center gap-2 text-primary"><Sunrise size={17} /> Word of the day</p><span className="text-xs text-muted-foreground">{new Date().toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span></div>
 {entry ? <><div className="mt-4 flex items-start justify-between gap-4"><div><p className="arabic text-4xl text-primary" dir="rtl" lang="bal">{entry.balochi_native}</p><p className="mt-1 text-sm italic text-muted-foreground">{entry.roman_balochi}</p></div><button className="icon-btn" aria-label="Toggle word of the day favorite" aria-pressed={personal.favorites.includes(entry.entry_id)} onClick={() => toggleFavorite(entry.entry_id)}><Bookmark size={20} fill={personal.favorites.includes(entry.entry_id) ? 'currentColor' : 'none'} /></button></div><div className="mb-4 mt-5 flex items-center justify-between"><h2 className="font-display text-3xl font-semibold">{entry.english}</h2><span dir="rtl" lang="ur" className="arabic text-2xl">{entry.urdu}</span></div><VerificationBadge status={entry.verification_status} /><Link to={`/word/${entry.entry_id}`} className="mt-5 flex min-h-11 items-center justify-between border-t border-primary/15 pt-3 text-sm font-semibold text-primary">Explore this word <ArrowRight size={17} /></Link></> : <p className="my-8 text-muted-foreground">Import entries to discover your daily word.</p>}
 </section>;
}
