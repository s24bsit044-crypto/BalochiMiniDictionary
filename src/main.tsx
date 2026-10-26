import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';
createRoot(document.getElementById('root')!).render(<App />);
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
 window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(() => console.log('Dictionary offline service worker registered')).catch(error => console.error('Offline cache registration failed', error)); });
}
