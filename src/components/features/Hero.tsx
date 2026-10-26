import { ArrowRight, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero from '@/assets/dictionary-hero.webp';
import { useDictionary } from '@/hooks/useDictionary';
export default function Hero() {
 const { entries } = useDictionary();
 return <section className="relative mb-8 grid overflow-hidden rounded-[24px] bg-primary text-primary-foreground md:grid-cols-[1.4fr_1fr]">
 <div className="relative z-10 px-7 py-9 sm:p-10 lg:px-12 lg:py-11"><p className="eyebrow mb-5 flex items-center gap-2 opacity-90"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Your language. Your connection.</p><h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-5xl lg:text-[54px]">Small words.<br /><span className="text-accent">A world of meaning.</span></h1><p className="mt-5 max-w-md text-sm leading-7 opacity-90 sm:text-base">Discover Balochi, Urdu, English, and Roman Balochi.<br className="hidden lg:block" /> Learn a little. Connect a little more.</p><div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"><Link to="/categories" className="flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-primary-foreground/40 underline-offset-8">Explore the dictionary <ArrowRight size={16} /></Link><span className="flex items-center gap-2 text-xs opacity-85"><HardDrive size={14} /> {entries.length} words stored locally</span></div></div>
 <div className="relative hidden min-h-full md:block"><img src={hero} alt="Illustrated open dictionary with a botanical sprig and Balochi-inspired textile motifs" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" /><div className="absolute bottom-8 right-8 rounded-xl border border-primary-foreground/20 bg-ink/75 px-4 py-3"><p className="arabic text-2xl" dir="rtl" lang="bal">بلوچی</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-80">Keep a language alive</p></div></div>
 </section>;
}
