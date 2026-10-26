import { useState, useEffect } from 'react';
import type { Entry } from '@/types/dictionary';
import WordCard from '@/components/features/WordCard';
import EmptyState from '@/components/features/EmptyState';
interface Props { entries: Entry[]; emptyTitle?: string; emptyMessage?: string; }
export default function WordList({ entries, emptyTitle = 'No matching words', emptyMessage = 'Try a shorter word, an alternative spelling, or search all languages.' }: Props) {
 const [limit, setLimit] = useState(24); useEffect(() => setLimit(24), [entries]);
 if (!entries.length) return <EmptyState title={emptyTitle} message={emptyMessage} />;
 return <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{entries.slice(0, limit).map(entry => <WordCard key={entry.entry_id} entry={entry} compact />)}</div>{entries.length > limit && <div className="mt-6 text-center"><button className="btn-secondary" onClick={() => setLimit(n => n + 24)}>Show more words ({entries.length - limit} remaining)</button></div>}</>;
}
