import type { Entry, ImportPreview } from '@/types/dictionary';
import { entrySchema } from '@/lib/validations';
import { wordKey } from '@/lib/search';
export const CSV_COLUMNS = ['entry_id', 'balochi_native', 'urdu', 'english', 'roman_balochi', 'roman_balochi_alternatives', 'category', 'notes', 'source', 'verification_status'] as const;
export const EXTRA_COLUMNS = ['dialect', 'example_balochi', 'example_urdu', 'example_english', 'example_roman', 'example_source'] as const;
export function parseCSV(text: string): string[][] {
 const rows: string[][] = []; let row: string[] = []; let field = ''; let quoted = false; let closed = false;
 const input = text.replace(/^\uFEFF/, '');
 const pushField = () => { row.push(field); field = ''; closed = false; };
 const pushRow = () => { pushField(); if (row.some(c => c.trim())) rows.push(row); row = []; };
 for (let i = 0; i < input.length; i++) {
  const c = input[i];
  if (quoted) { if (c === '"') { if (input[i + 1] === '"') { field += '"'; i++; } else { quoted = false; closed = true; } } else field += c; continue; }
  if (c === ',') { pushField(); continue; }
  if (c === '\n' || c === '\r') { if (c === '\r' && input[i + 1] === '\n') i++; pushRow(); continue; }
  if (closed) throw new Error('Unexpected text after a closing quote.');
  if (c === '"') { if (field.length) throw new Error('A quote must begin at the start of a field.'); quoted = true; } else field += c;
 }
 if (quoted) throw new Error('Unclosed quoted field.');
 if (field.length || row.length || closed) pushRow();
 return rows;
}
export function previewCSV(text: string, existing: Entry[]): ImportPreview {
 const rows = parseCSV(text); const header = (rows.shift() ?? []).map(c => c.trim());
 const missing = CSV_COLUMNS.filter(c => !header.includes(c));
 if (missing.length) throw new Error(`Missing required columns: ${missing.join(', ')}`);
 if (new Set(header).size !== header.length) throw new Error('Duplicate column headings.');
 const ids = new Set(existing.map(e => e.entry_id)); const words = new Set(existing.map(wordKey));
 const result: ImportPreview = { entries: [], errors: [], skipped: 0, total: rows.length };
 rows.forEach((row, i) => {
  if (row.length !== header.length) { result.errors.push(`Row ${i + 2}: column count does not match header.`); result.skipped++; return; }
  const record = Object.fromEntries(header.map((key, j) => [key, row[j]]));
  const parsed = entrySchema.safeParse(record);
  if (!parsed.success) { result.errors.push(`Row ${i + 2}: ${parsed.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join('; ')}`); result.skipped++; return; }
  const entry = parsed.data;
  if (ids.has(entry.entry_id) || words.has(wordKey(entry))) { result.errors.push(`Row ${i + 2}: duplicate ID or native-word/English pair; skipped, not overwritten.`); result.skipped++; return; }
  ids.add(entry.entry_id); words.add(wordKey(entry)); result.entries.push(entry);
 });
 return result;
}
export function exportCSV(entries: Entry[]) {
 const columns = [...CSV_COLUMNS, ...EXTRA_COLUMNS];
 // Formula-shaped cells are never executed in-app. Open exported files as text, not spreadsheet formulas.
 const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
 return '\uFEFF' + [columns.join(','), ...entries.map(e => columns.map(c => escape(e[c] ?? '')).join(','))].join('\r\n');
}
export function downloadText(name: string, content: string, type = 'text/csv;charset=utf-8') {
 const url = URL.createObjectURL(new Blob([content], { type })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function readUTF8(file: File) { if (file.size > 10 * 1024 * 1024) throw new Error('Maximum file size is 10 MB.'); return new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer()); }
