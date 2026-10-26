import { useState, useEffect } from 'react';
export default function useOfflineStatus() {
 const [online, setOnline] = useState(navigator.onLine); const [cached, setCached] = useState(false);
 useEffect(() => {
  const update = () => setOnline(navigator.onLine); const controlled = () => setCached(!!navigator.serviceWorker?.controller);
  window.addEventListener('online', update); window.addEventListener('offline', update);
  if ('serviceWorker' in navigator) { controlled(); navigator.serviceWorker.addEventListener('controllerchange', controlled); navigator.serviceWorker.getRegistration().then(reg => { if (reg?.active) setCached(true); }); }
  return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); navigator.serviceWorker?.removeEventListener('controllerchange', controlled); };
 }, []);
 return { online, cached };
}
