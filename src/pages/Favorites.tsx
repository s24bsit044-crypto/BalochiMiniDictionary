import { useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { useDictionary } from '@/hooks/useDictionary';
import WordList from '@/components/features/WordList';
export default function Favorites() {
 const { entries, personal } = useDictionary(); const saved = useMemo(() => entries.filter(e => personal.favorites.includes(e.entry_id) && e.verification_status !== 'rejected'), [entries, personal.favorites]);
 return <div className="page-enter"><p className="eyebrow flex items-center gap-2 text-primary"><Bookmark size={16} /> Your personal collection</p><h1 className="mb-3 mt-3 font-display text-4xl font-semibold">Words worth keeping</h1><p className="mb-8 text-muted-foreground">{saved.length} saved words, stored on this device. A vocabulary that grows with you.</p><WordList entries={saved} emptyTitle="Keep your first word" emptyMessage="Tap the bookmark on any word to save it here. Your favorites stay with you between visits." /></div>;
}
