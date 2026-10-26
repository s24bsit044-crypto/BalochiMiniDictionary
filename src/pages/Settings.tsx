import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImportPanel from '@/components/features/ImportPanel';
import BackupPanel from '@/components/features/BackupPanel';
import DiagnosticsPanel from '@/components/features/DiagnosticsPanel';
import DevicePanel from '@/components/features/DevicePanel';
export default function Settings() {
 return <div className="page-enter"><p className="eyebrow text-primary">Local, transparent, yours</p><h1 className="mb-3 mt-3 font-display text-4xl font-semibold">Data & settings</h1><p className="mb-8 text-muted-foreground">Manage your personal dictionary without an account or a translation API.</p><div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]"><div className="space-y-6"><ImportPanel /><BackupPanel /><DiagnosticsPanel /></div><aside className="space-y-6"><DevicePanel /><section className="panel p-6"><ShieldCheck className="mb-4 text-primary" size={23} /><h2 className="text-lg font-semibold">A note on trust</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">All 325 supplied entries start as “needs review.” No source, recording, dialect, or example has been invented. A verified label requires a source in the imported file; it is not independent approval by this app.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">There are no shared administrator accounts or editor privileges in this version. Importing changes only your own browser’s dataset.</p><Link to="/about" className="mt-4 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Setup, limitations & testing</Link></section></aside></div></div>;
}
