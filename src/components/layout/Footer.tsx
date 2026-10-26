import { BookOpen, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDictionary } from '@/hooks/useDictionary';
export default function Footer() {
 const { entries } = useDictionary();
 return <footer className="mx-auto mb-20 mt-14 flex max-w-[1320px] flex-col items-center justify-between gap-4 border-t px-5 py-6 text-xs text-muted-foreground sm:mx-8 sm:flex-row md:mb-0 lg:mx-12"><span className="flex items-center gap-2"><BookOpen size={15} /> A little word. A stronger connection.</span><span className="flex items-center gap-4"><span className="flex items-center gap-1.5"><HardDrive size={14} /> {entries.length.toLocaleString()} local entries</span><Link className="flex min-h-11 items-center underline underline-offset-4" to="/settings">Data & privacy</Link></span></footer>;
}
