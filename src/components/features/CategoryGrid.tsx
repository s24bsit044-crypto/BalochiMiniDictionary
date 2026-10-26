import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useDictionary } from '@/hooks/useDictionary';
import { CATEGORIES, categoryInfo } from '@/constants/categories';
interface Props { preview?: boolean; }
export default function CategoryGrid({ preview = false }: Props) {
 const { entries } = useDictionary(); const names = [...new Set([...CATEGORIES.map(c => c.name), ...entries.map(e => e.category)])];
 const categories = names.map(categoryInfo).slice(0, preview ? 6 : undefined);
 return <div className={`grid gap-3 ${preview ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>{categories.map(({ name, label, icon: Icon }) => { const count = entries.filter(e => e.category === name && e.verification_status !== 'rejected').length; return <Link key={name} to={`/browse?category=${encodeURIComponent(name)}`} className="panel group flex items-center gap-3 px-4 py-5 hover:-translate-y-0.5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-primary"><Icon size={21} strokeWidth={1.6} /></span><div className="min-w-0"><h3 className="text-sm font-semibold">{label}</h3><p className="mt-1 text-xs text-muted-foreground">{count} {count === 1 ? 'word' : 'words'}</p></div>{!preview && <ArrowUpRight size={17} className="ml-auto text-muted-foreground" />}</Link>; })}</div>;
}
