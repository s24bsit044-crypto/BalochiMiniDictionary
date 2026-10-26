import { openDatabase, transactionDone, loadSnapshot, type Snapshot, EMPTY_PERSONAL } from '@/lib/database';
import { entrySchema } from '@/lib/validations';
import { wordKey } from '@/lib/search';
import type { Entry } from '@/types/dictionary';
export async function importEntries(entries: Entry[]): Promise<number> {
 const validated = entries.map(e => entrySchema.parse(e)); const db = await openDatabase(); const tx = db.transaction(['entries', 'meta'], 'readwrite'); const done = transactionDone(tx); const store = tx.objectStore('entries'); const meta = tx.objectStore('meta'); let added = 0;
 const current = store.getAll(); const personal = meta.get('personal');
 personal.onsuccess = () => { current.onsuccess = () => commit(); if (current.readyState === 'done') commit(); };
 function commit() {
  const existing = current.result as Entry[]; const ids = new Set(existing.map(e => e.entry_id)); const keys = new Set(existing.map(wordKey));
  meta.put({ key: 'backup', value: { entries: existing, personal: personal.result?.value ?? EMPTY_PERSONAL, schemaVersion: 2, createdAt: new Date().toISOString() } });
  validated.forEach(e => { if (!ids.has(e.entry_id) && !keys.has(wordKey(e))) { ids.add(e.entry_id); keys.add(wordKey(e)); store.add({ ...e, word_key: wordKey(e) }); added++; } });
 }
 await done; return added;
}
export async function replaceLocalData(snapshot?: Snapshot) {
 const previous = await loadSnapshot(); const db = await openDatabase(); const tx = db.transaction(['entries', 'meta'], 'readwrite'); const done = transactionDone(tx); const store = tx.objectStore('entries'); const meta = tx.objectStore('meta');
 const entries = (snapshot?.entries ?? []).map(e => entrySchema.parse(e));
 meta.put({ key: 'backup', value: previous }); store.clear(); entries.forEach(e => store.add({ ...e, word_key: wordKey(e) })); meta.put({ key: 'personal', value: snapshot?.personal ?? structuredClone(EMPTY_PERSONAL) }); meta.put({ key: 'initialized', value: true }); await done;
}
