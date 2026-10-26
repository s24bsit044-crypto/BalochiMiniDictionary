import type { Entry } from '@/types/dictionary';
import { normalize } from '@/lib/search';
export interface QuizQuestion { entry: Entry; options: string[]; }
export function makeQuiz(entries: Entry[], review: boolean): QuizQuestion[] {
 const pool = entries.filter(e => review ? e.verification_status === 'needs review' : e.verification_status === 'verified');
 const meanings = [...new Set(pool.map(e => e.english))];
 if (meanings.length < 4) return [];
 const uniqueNative = pool.filter((e, i) => pool.findIndex(p => normalize(p.balochi_native) === normalize(e.balochi_native)) === i && new Set(pool.filter(p => normalize(p.balochi_native) === normalize(e.balochi_native)).map(p => p.english)).size === 1);
 const shuffled = [...uniqueNative].sort(() => Math.random() - 0.5).slice(0, 5);
 return shuffled.map(entry => ({ entry, options: [entry.english, ...meanings.filter(m => m !== entry.english).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5) }));
}
