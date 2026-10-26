import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Globe2 } from 'lucide-react';
import { useDictionary } from '@/hooks/useDictionary';
import { dailyEntries, searchIndex } from '@/lib/search';
import Hero from '@/components/features/Hero';
import SearchBar from '@/components/features/SearchBar';
import WordList from '@/components/features/WordList';
import WordOfDay from '@/components/features/WordOfDay';
import CategoryGrid from '@/components/features/CategoryGrid';
import RecentWords from '@/components/features/RecentWords';
import LearningTeaser from '@/components/features/LearningTeaser';
import EmptyState from '@/components/features/EmptyState';
export default function Index() {
 const { entries, personal, index } = useDictionary(); const [params, setParams] = useSearchParams(); const query = params.get('q') ?? ''; const deferred = useDeferredValue(query);
 const matches = useMemo(() => searchIndex(index, deferred, personal.preferences.language), [index, deferred, personal.preferences.language]); const day = dailyEntries(entries, 1)[0];
 return <div className="page-enter"><div className="mb-6 flex items-center justify-between"><p className="text-sm text-muted-foreground">A bridge between languages</p><span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><Globe2 size={14} /> Balochi · Urdu · English · Roman Balochi</span></div><Hero /><SearchBar query={query} onQuery={q => setParams(q ? { q } : {}, { replace: true })} /><div className="mb-9 mt-3 flex flex-wrap justify-between gap-2 px-1 text-xs text-muted-foreground"><span>Try: <button className="min-h-8 px-1 underline underline-offset-2" onClick={() => { setParams({ q: 'Welcome' }); }}>Welcome</button>, <button className="min-h-8 px-1 underline underline-offset-2" onClick={() => { setParams({ q: 'Shaptalog' }); }}>Shaptalog</button>, or <span className="arabic text-base" lang="ur" dir="rtl">تربوز</span></span><span className="flex items-center gap-1.5"><BookOpen size={13} /> No translation API. Just your dictionary.</span></div>
 {query.trim() ? <section id="search-results" className="scroll-mt-8"><div className="mb-5 flex items-center justify-between"><h2 className="section-title">Search results</h2><span className="text-sm text-muted-foreground">{matches.length} matches</span></div><WordList entries={matches} /></section> : !entries.length ? <EmptyState title="Your dictionary starts here" message="Import a UTF-8 CSV to start exploring. All core features work with your own dataset." action /> : <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="space-y-9"><section><div className="mb-5 flex items-center justify-between"><h2 className="section-title">Explore by category</h2><Link to="/categories" className="flex min-h-11 items-center gap-2 text-xs font-medium text-primary">View all <ArrowRight size={15} /></Link></div><CategoryGrid preview /></section><RecentWords /><div className="flex items-start gap-3 rounded-xl border border-dashed p-4"><BookOpen size={19} className="mt-1 shrink-0 text-primary" /><p className="text-xs leading-6 text-muted-foreground"><strong className="font-semibold text-foreground">Language is living.</strong> Your supplied master sheet is preserved as needs review. Dialects and spellings may vary; check the source on each word.</p></div></div><aside className="space-y-5"><WordOfDay entry={day} /><LearningTeaser /></aside></div>}
 </div>;
}
