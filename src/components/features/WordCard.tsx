import { Bookmark, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Entry } from '@/types/dictionary';
import { useDictionary } from '@/hooks/useDictionary';
import { categoryInfo } from '@/constants/categories';
import VerificationBadge from '@/components/features/VerificationBadge';
import { cn } from '@/lib/utils';
interface Props { entry: Entry; compact?: boolean; }
export default function WordCard({ entry, compact = false }: Props) {
 const { personal, toggleFavorite } = useDictionary(); const saved = personal.favorites.includes(entry.entry_id);
 return <article className="panel relative flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"><div className="flex items-start justify-between px-5 pt-4"><span className="eyebrow mt-3 text-muted-foreground">{categoryInfo(entry.category).label}</span><button className={cn('icon-btn -mr-2 text-muted-foreground', saved && 'text-primary')} aria-label={`${saved ? 'Remove' : 'Save'} ${entry.english} ${saved ? 'from' : 'to'} favorites`} aria-pressed={saved} onClick={() => toggleFavorite(entry.entry_id)}><Bookmark size={19} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.7} /></button></div>
  <Link to={`/word/${encodeURIComponent(entry.entry_id)}`} className="flex flex-1 flex-col px-5 pb-5"><p className={cn('arabic text-primary', compact ? 'text-3xl' : 'mt-3 text-4xl')} lang="bal" dir="rtl">{entry.balochi_native}</p><p className="text-sm italic text-muted-foreground">{entry.roman_balochi}</p><div className="mt-4 flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{entry.english}</h3><span lang="ur" dir="rtl" className="arabic text-xl text-muted-foreground">{entry.urdu}</span></div><div className="mt-4 flex items-center justify-between border-t pt-3"><VerificationBadge status={entry.verification_status} /><ArrowUpRight size={17} className="text-muted-foreground" /></div></Link>
 </article>;
}
