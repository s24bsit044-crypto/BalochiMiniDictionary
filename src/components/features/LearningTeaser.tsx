import { ArrowUpRight, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDictionary } from '@/hooks/useDictionary';
import { dayKey, dailyEntries } from '@/lib/search';
export default function LearningTeaser() {
 const { entries, personal } = useDictionary(); const daily = dailyEntries(entries); const done = daily.filter(e => personal.learned[dayKey()]?.includes(e.entry_id)).length;
 return <Link to="/learn" className="panel block bg-warning-soft p-5 hover:-translate-y-0.5"><div className="mb-3 flex items-center justify-between text-warning"><Sprout size={22} strokeWidth={1.5} /><ArrowUpRight size={17} /></div><h3 className="font-display text-xl font-semibold">Make a little progress</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Five words. A few minutes. A daily habit.</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full bg-warning" style={{ width: `${daily.length ? done / daily.length * 100 : 0}%` }} /></div><p className="mt-2 text-xs text-warning">{done} of {daily.length} words explored today</p></Link>;
}
