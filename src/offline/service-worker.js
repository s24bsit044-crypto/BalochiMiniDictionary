/* Production-only app shell; no dictionary content is sent to the network. */
const CACHE = '__CACHE_VERSION__';
const PRECACHE = __PRECACHE_ASSETS__;
self.addEventListener('install', event => {
 event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
 event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('balochi-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
 const request = event.request; const url = new URL(request.url);
 if (request.method !== 'GET') return;
 if (url.origin === self.location.origin) {
  if (request.mode === 'navigate') { event.respondWith(fetch(request).catch(() => caches.match('/index.html').then(response => response || Response.error()))); return; }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => { if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy))); } return response; })));
 } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => { if (response.ok || response.type === 'opaque') { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy))); } return response; }).catch(() => new Response('', { status: 200 }))));
 }
});
