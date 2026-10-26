export type VerificationStatus = 'needs review' | 'verified' | 'rejected';
export type Language = 'all' | 'english' | 'balochi_native' | 'urdu' | 'roman_balochi';
export interface Entry { entry_id: string; balochi_native: string; urdu: string; english: string; roman_balochi: string; roman_balochi_alternatives: string; category: string; notes: string; source: string; verification_status: VerificationStatus; dialect?: string; example_balochi?: string; example_urdu?: string; example_english?: string; example_roman?: string; example_source?: string; }
export interface Preferences { language: Language; }
export interface PersonalData { favorites: string[]; recent: string[]; learned: Record<string, string[]>; preferences: Preferences; }
export interface ImportPreview { entries: Entry[]; errors: string[]; skipped: number; total: number; }
export interface DiagnosticResult { name: string; passed: boolean; detail: string; }
