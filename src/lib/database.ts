import { SEED_ENTRIES } from '@/constants/seed';
import { wordKey } from '@/lib/search';
import type { Entry, PersonalData } from '@/types/dictionary';
export const EMPTY_PERSONAL: PersonalData = { favorites: [], recent: [], learned: {}, preferences: { language: 'all' } };
export interface Snapshot { entries: Entry[]; personal: PersonalData; createdAt: string; schemaVersion: 2; }
let connection: Promise<IDBDatabase> | undefined;
export function requestValue<T>(request: IDBRequest<T>): Promise<T> { return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
export function transactionDone(tx: IDBTransaction): Promise<void> { return new Promise((resolve, reject) => { tx.oncomplete = () => resolve(); tx.onabort = () => reject(tx.error ?? new Error('Database transaction was aborted.')); tx.onerror = () => reject(tx.error ?? new Error('Database write failed.')); }); }
export function openDatabase() {
 if (!connection) connection = new Promise<IDBDatabase>((resolve, reject) => {
  if (!globalThis.indexedDB) { reject(new Error('IndexedDB is unavailable. Enable browser storage to use this dictionary.')); return; }
  const request = indexedDB.open('balochi-mini-dictionary', 2);
  request.onupgradeneeded = () => {
   const db = request.result;
   const entries = db.objectStoreNames.contains('entries') ? request.transaction!.objectStore('entries') : db.createObjectStore('entries', { keyPath: 'entry_id' });
   if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
   if (!entries.indexNames.contains('category')) entries.createIndex('category', 'category');
   if (!entries.indexNames.contains('verification_status')) entries.createIndex('verification_status', 'verification_status');
   if (!entries.indexNames.contains('word_key')) { entries.createIndex('word_key', 'word_key', { unique: true }); const cursor = entries.openCursor(); cursor.onsuccess = () => { const item = cursor.result; if (item) { item.update({ ...item.value, word_key: wordKey(item.value as Entry) }); item.continue(); } }; }
  };
  request.onsuccess = () => { request.result.onversionchange = () => { request.result.close(); connection = undefined; }; resolve(request.result); };
  request.onerror = () => { connection = undefined; reject(request.error ?? new Error('Unable to open database.')); };
  request.onblocked = () => { connection = undefined; reject(new Error('Close other dictionary tabs, then reload to complete the database upgrade.')); };
 });
 return connection;
}
export async function initializeDatabase() {
 const db = await openDatabase(); const tx = db.transaction(['entries', 'meta'], 'readwrite'); const done = transactionDone(tx); const meta = tx.objectStore('meta');
 const flag = meta.get('initialized'); flag.onsuccess = () => { if (!flag.result) { const entries = tx.objectStore('entries'); const count = entries.count(); count.onsuccess = () => { if (!count.result) SEED_ENTRIES.forEach(e => entries.add({ ...e, word_key: wordKey(e) })); meta.put({ key: 'initialized', value: true }); meta.put({ key: 'personal', value: EMPTY_PERSONAL }); }; } };
 await done;
}
export async function loadSnapshot(): Promise<Snapshot> {
 const db = await openDatabase(); const tx = db.transaction(['entries', 'meta'], 'readonly');
 const entriesRequest = requestValue(tx.objectStore('entries').getAll()) as Promise<Entry[]>;
 const personalRequest = requestValue(tx.objectStore('meta').get('personal'));
 const [entries, record] = await Promise.all([entriesRequest, personalRequest]);
 return { entries, personal: (record?.value as PersonalData | undefined) ?? structuredClone(EMPTY_PERSONAL), createdAt: new Date().toISOString(), schemaVersion: 2 };
}
export async function savePersonal(personal: PersonalData) { const db = await openDatabase(); const tx = db.transaction('meta', 'readwrite'); const done = transactionDone(tx); tx.objectStore('meta').put({ key: 'personal', value: personal }); await done; }
export async function getBackup(): Promise<Snapshot | undefined> { const db = await openDatabase(); return (await requestValue(db.transaction('meta').objectStore('meta').get('backup')))?.value; }
