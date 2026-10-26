import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { initializeDatabase, loadSnapshot, savePersonal, EMPTY_PERSONAL, getBackup } from '@/lib/database';
import { importEntries, replaceLocalData } from '@/lib/repository';
import { buildSearchIndex, dayKey } from '@/lib/search';
import type { Entry, PersonalData, Language } from '@/types/dictionary';
interface DictionaryContext { entries: Entry[]; personal: PersonalData; index: ReturnType<typeof buildSearchIndex>; loading: boolean; error: string; toggleFavorite: (id: string) => void; recordRecent: (id: string) => void; setLanguage: (language: Language) => void; markLearned: (id: string) => void; importData: (entries: Entry[]) => Promise<number>; clearData: () => Promise<void>; restoreBackup: () => Promise<void>; clearRecent: () => void; }
const Context = createContext<DictionaryContext | null>(null);
interface Props { children: ReactNode; }
export function DictionaryProvider({ children }: Props) {
 const [entries, setEntries] = useState<Entry[]>([]); const [personal, setPersonal] = useState<PersonalData>(structuredClone(EMPTY_PERSONAL)); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
 const latest = useRef(personal); const queue = useRef(Promise.resolve());
 const refresh = useCallback(async () => { const snapshot = await loadSnapshot(); setEntries(snapshot.entries); setPersonal(snapshot.personal); latest.current = snapshot.personal; }, []);
 useEffect(() => { initializeDatabase().then(refresh).then(() => setLoading(false)).catch((e: Error) => { console.error('Dictionary initialization', e); setError(e.message); setLoading(false); }); }, [refresh]);
 const updatePersonal = useCallback((fn: (p: PersonalData) => PersonalData) => {
  const next = fn(latest.current); latest.current = next; setPersonal(next);
  queue.current = queue.current.then(() => savePersonal(next)).catch((e: Error) => { console.error('Personal data persistence', e); toast.error(`Changes could not be saved: ${e.message}`); });
 }, []);
 const toggleFavorite = useCallback((id: string) => { const saved = latest.current.favorites.includes(id); updatePersonal(p => ({ ...p, favorites: saved ? p.favorites.filter(v => v !== id) : [...p.favorites, id] })); toast.success(saved ? 'Removed from favorites' : 'Saved to favorites'); }, [updatePersonal]);
 const recordRecent = useCallback((id: string) => updatePersonal(p => ({ ...p, recent: [id, ...p.recent.filter(v => v !== id)].slice(0, 20) })), [updatePersonal]);
 const setLanguage = useCallback((language: Language) => updatePersonal(p => ({ ...p, preferences: { ...p.preferences, language } })), [updatePersonal]);
 const markLearned = useCallback((id: string) => updatePersonal(p => { const key = dayKey(); const current = p.learned[key] ?? []; return { ...p, learned: { ...p.learned, [key]: current.includes(id) ? current.filter(v => v !== id) : [...current, id] } }; }), [updatePersonal]);
 const importData = useCallback(async (data: Entry[]) => { await queue.current; const count = await importEntries(data); await refresh(); return count; }, [refresh]);
 const clearData = useCallback(async () => { await queue.current; await replaceLocalData(); await refresh(); }, [refresh]);
 const restoreBackup = useCallback(async () => { await queue.current; const backup = await getBackup(); if (!backup) throw new Error('No automatic backup is available yet.'); await replaceLocalData(backup); await refresh(); }, [refresh]);
 const index = useMemo(() => buildSearchIndex(entries), [entries]);
 return <Context.Provider value={{ entries, personal, index, loading, error, toggleFavorite, recordRecent, setLanguage, markLearned, importData, clearData, restoreBackup, clearRecent: () => updatePersonal(p => ({ ...p, recent: [] })) }}>{children}</Context.Provider>;
}
export function useDictionary() { const context = useContext(Context); if (!context) throw new Error('DictionaryProvider is missing.'); return context; }
