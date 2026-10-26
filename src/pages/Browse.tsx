import { useDeferredValue, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDictionary } from '@/hooks/useDictionary';
import { searchIndex } from '@/lib/search';
import { categoryInfo } from '@/constants/categories';
import SearchBar from '@/components/features/SearchBar';
import WordList from '@/components/features/WordList';
export default function Browse() {
 const [params, setParams] = useSearchParams(); const category = params.get('category') ?? ''; const query = params.get('q') ?? ''; const deferred = useDeferredValue(query); const { index, personal } = useDictionary();
 const entries = useMemo(() => searchIndex(index, deferred, personal.preferences.language, category), [index, deferred, personal.preferences.language, category]);
 return <div className="page-enter"><Link to="/categories" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"><ArrowLeft size={17} /> All categories</Link><p className="eyebrow text-primary">Your local dictionary</p><h1 className="mb-3 mt-3 font-display text-4xl font-semibold">{category ? categoryInfo(category).label : 'All words'}</h1><p className="mb-8 text-muted-foreground">{entries.length} searchable words. Native script, Roman Balochi, English, and Urdu.</p><SearchBar query={query} onQuery={q => setParams({ ...(category ? { category } : {}), ...(q ? { q } : {}) }, { replace: true })} /><section id="search-results" className="mt-8"><WordList entries={entries} /></section></div>;
}
