// learn.ai service worker — precache the app shell, serve cache-first with background refresh.
const VERSION = 'learnai-v1.3.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/storage.js',
  './js/progress.js',
  './js/tree.js',
  './js/dashboard.js',
  './js/career.js',
  './js/gemini.js',
  './js/config.js',
  './js/data/careers.js',
  './js/data/index.js',
  './js/data/foundation-a.js',
  './js/data/foundation-b.js',
  './js/data/tracks-a.js',
  './js/data/tracks-b.js',
  './js/data/projects.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Same-origin: stale-while-revalidate. Cross-origin: network only.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;

  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(event.request);
      const refresh = fetch(event.request)
        .then((resp) => {
          if (resp && resp.status === 200) cache.put(event.request, resp.clone());
          return resp;
        })
        .catch(() => cached);
      return cached || refresh;
    })
  );
});
