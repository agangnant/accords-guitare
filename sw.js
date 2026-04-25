
// sw.js
const CACHE_NAME = 'accords-guitare-cache-v6';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/AudioEngine.js',
  './js/Fretboard.js',
  './data/voicings.js',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  // 🔴 LIGNE CRUCIALE
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache ouvert et mis à jour (v6)');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});
