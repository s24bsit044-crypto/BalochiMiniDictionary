import { SEED_ENTRIES } from '@/constants/seed';
import { buildSearchIndex, searchIndex } from '@/lib/search';
import { parseCSV, previewCSV, exportCSV, CSV_COLUMNS } from '@/lib/csv';
import { makeQuiz } from '@/lib/quiz';
import { requestValue, transactionDone } from '@/lib/database';
import type { DiagnosticResult } from '@/types/dictionary';
export async function runDiagnostics(): Promise<DiagnosticResult[]> {
 const results: DiagnosticResult[] = []; const index = buildSearchIndex(SEED_ENTRIES);
 const check = (name: string, condition: boolean, detail = '') => results.push({ name, passed: condition, detail: detail || (condition ? 'Assertion passed in this browser.' : 'Assertion failed in this browser.') });
 const throws = (fn: () => unknown) => { try { fn(); return false; } catch { return true; } };
 check('325 supplied entries and unique stable IDs', SEED_ENTRIES.length === 325 && new Set(SEED_ENTRIES.map(e => e.entry_id)).size === 325);
 check('English case-insensitive partial search', searchIndex(index, 'WATERM').some(e => e.english === 'Watermelon'));
 check('Roman Balochi alternative search', searchIndex(index, 'SHAPT', 'roman_balochi').some(e => e.english === 'Watermelon'));
 check('Urdu search', searchIndex(index, 'تربوز', 'urdu').some(e => e.english === 'Watermelon'));
 check('Balochi native diacritic-insensitive search', searchIndex(index, 'ھبند', 'balochi_native').some(e => e.english === 'Watermelon'));
 check('Quoted CSV commas, escaped quotes, newlines', parseCSV('a,b\r\n"x,y","say ""hi""\nnext"')[1][1] === 'say "hi"\nnext');
 const csv = exportCSV(SEED_ENTRIES); const preview = previewCSV(csv, []);
 check('UTF-8 CSV roundtrip', preview.entries.length === 325 && preview.entries[0].urdu === 'تربوز' && preview.entries[0].balochi_native === SEED_ENTRIES[0].balochi_native);
 check('Duplicate IDs and word pairs skipped', previewCSV(csv, SEED_ENTRIES).skipped === 325 && previewCSV(exportCSV([SEED_ENTRIES[0], { ...SEED_ENTRIES[0], entry_id: 'different-id' }]), []).skipped === 1);
 check('Missing headers rejected', throws(() => previewCSV('english\nwater', [])));
 check('Invalid quoted CSV rejected', throws(() => parseCSV('"unclosed')));
 check('Invalid entry row skipped', previewCSV(CSV_COLUMNS.join(',') + '\n,,,,,,,,,', []).entries.length === 0);
 check('Empty dictionary search', searchIndex(buildSearchIndex([]), 'test').length === 0);
 check('Unverified dataset cannot produce verified quiz', makeQuiz(SEED_ENTRIES, false).length === 0);
 const large = Array.from({ length: 10000 }, (_, i) => ({ ...SEED_ENTRIES[i % 325], entry_id: `large-${i}` })); const start = performance.now(); const largeResult = searchIndex(buildSearchIndex(large), 'Shaptalog'); const ms = performance.now() - start;
 check('10,000-entry search correctness', largeResult.length > 0, `Index build + search: ${ms.toFixed(1)} ms. No cross-device performance claim.`);
 try {
  const open = indexedDB.open('balochi-diagnostics-only', 1); open.onupgradeneeded = () => open.result.createObjectStore('test'); const db = await requestValue(open);
  const tx = db.transaction('test', 'readwrite'); const done = transactionDone(tx); tx.objectStore('test').put({ favorites: ['master-001'], recent: ['master-002'], native: 'ھَبُند' }, 'state'); await done; db.close();
  const reopened = await requestValue(indexedDB.open('balochi-diagnostics-only', 1)); const data = await requestValue(reopened.transaction('test').objectStore('test').get('state'));
  check('IndexedDB close/reopen preserves Unicode, favorites, history', data.native === 'ھَبُند' && data.favorites[0] === 'master-001' && data.recent[0] === 'master-002'); reopened.close(); await requestValue(indexedDB.deleteDatabase('balochi-diagnostics-only'));
 } catch (e) { check('IndexedDB persistence', false, e instanceof Error ? e.message : 'Storage test failed.'); }
 return results;
}
