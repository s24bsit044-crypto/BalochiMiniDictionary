import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DictionaryProvider, useDictionary } from '@/hooks/useDictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import Index from '@/pages/Index';
const Categories = lazy(() => import('@/pages/Categories'));
const Browse = lazy(() => import('@/pages/Browse'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Learn = lazy(() => import('@/pages/Learn'));
const WordDetail = lazy(() => import('@/pages/WordDetail'));
const Settings = lazy(() => import('@/pages/Settings'));
const About = lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));
function DictionaryShell() {
 const { loading, error } = useDictionary();
 return <><Header /><main className="mx-auto min-h-[70vh] max-w-[1320px] px-5 py-7 sm:px-8 lg:px-12 lg:py-8">{loading ? <div role="status" className="panel p-10 text-center text-muted-foreground">Opening your local dictionary…</div> : error ? <div role="alert" className="panel p-8"><h1 className="section-title">Your dictionary could not be opened</h1><p className="my-4 text-muted-foreground">{error}</p><p className="mb-5 text-sm text-muted-foreground">No data was intentionally deleted. Check browser storage permissions or close other tabs, then reload.</p><button className="btn-primary" onClick={() => globalThis.location.reload()}>Reload</button></div> : <Suspense fallback={<p role="status" className="py-12 text-center text-muted-foreground">Opening this page…</p>}><Routes><Route path="/" element={<Index />} /><Route path="/categories" element={<Categories />} /><Route path="/browse" element={<Browse />} /><Route path="/favorites" element={<Favorites />} /><Route path="/learn" element={<Learn />} /><Route path="/word/:id" element={<WordDetail />} /><Route path="/settings" element={<Settings />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></Suspense>}</main><Footer /></>;
}
export default function App() { return <ErrorBoundary><DictionaryProvider><BrowserRouter><DictionaryShell /></BrowserRouter><Toaster position="top-center" richColors /></DictionaryProvider></ErrorBoundary>; }
