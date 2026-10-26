import { BookOpen, Bookmark, LayoutGrid, Sprout, Settings2, Search } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
const LINKS = [{ to: '/', label: 'Dictionary', icon: Search }, { to: '/categories', label: 'Categories', icon: LayoutGrid }, { to: '/favorites', label: 'Favorites', icon: Bookmark }, { to: '/learn', label: 'Learn', icon: Sprout }];
export default function Header() {
 return <><header className="border-b bg-card"><div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
  <Link to="/" className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BookOpen size={23} strokeWidth={1.7} /></span><span><span className="block font-display text-xl font-bold leading-tight">Balochi<span className="text-primary">.</span></span><span className="eyebrow text-muted-foreground">Mini Dictionary</span></span></Link>
  <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">{LINKS.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => cn('flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium hover:bg-secondary', isActive ? 'bg-secondary text-primary' : 'text-muted-foreground')}><Icon size={17} />{label}</NavLink>)}</nav>
  <Link to="/settings" aria-label="Data and settings" className="icon-btn text-muted-foreground"><Settings2 size={21} /></Link>
 </div></header><nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t bg-card px-2 pb-[env(safe-area-inset-bottom)] md:hidden">{LINKS.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => cn('flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}><Icon size={21} />{label}</NavLink>)}</nav></>;
}
