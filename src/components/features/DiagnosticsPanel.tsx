import { useState } from 'react';
import { FlaskConical, Check, CircleAlert, Download } from 'lucide-react';
import { toast } from 'sonner';
import { runDiagnostics } from '@/tests/diagnostics';
import { downloadText } from '@/lib/csv';
import type { DiagnosticResult } from '@/types/dictionary';
export default function DiagnosticsPanel() {
 const [results, setResults] = useState<DiagnosticResult[]>([]); const [busy, setBusy] = useState(false); const [when, setWhen] = useState('');
 const run = () => { setBusy(true); runDiagnostics().then(r => { setResults(r); setWhen(new Date().toISOString()); toast.success(`Diagnostics finished: ${r.filter(t => t.passed).length}/${r.length} passed`); }).catch((e: Error) => toast.error(`Diagnostics failed: ${e.message}`)).finally(() => setBusy(false)); };
 return <section className="panel p-6"><h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><FlaskConical size={19} /> Browser diagnostics</h2><p className="mb-5 text-sm leading-7 text-muted-foreground">Run actual checks for search, Unicode data, CSV validation, duplicates, and isolated database persistence. Results apply only to this browser. Visual RTL, device restart, and airplane-mode checks require manual testing.</p><button className="btn-secondary" disabled={busy} onClick={run}>{busy ? 'Running checks…' : 'Run diagnostics'}</button>{results.length > 0 && <><ul className="mt-5 max-h-80 space-y-3 overflow-auto text-sm">{results.map(r => <li key={r.name} className="flex items-start gap-2">{r.passed ? <Check size={17} className="mt-1 shrink-0 text-primary" /> : <CircleAlert size={17} className="mt-1 shrink-0 text-destructive" />}<div>{r.name}<p className="mt-1 text-xs text-muted-foreground">{r.detail}</p></div></li>)}</ul><button className="btn-secondary mt-5" onClick={() => downloadText('balochi-test-report.json', JSON.stringify({ executedAt: when, userAgent: navigator.userAgent, results, manualTests: 'Not executed: visual RTL, offline cold reload, Android device restart, APK, shared editor permissions.' }, null, 2), 'application/json')}><Download size={16} /> Export actual test report</button></>}</section>;
}
