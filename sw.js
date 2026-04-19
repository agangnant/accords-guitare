// sw.js (version nettoyée sans les MP3)

// On peut garder le même nom de cache ou passer à v4
const CACHE_NAME = 'accords-guitare-cache-v3';

const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'css/style.css',
  'js/app.js',
  'data/voicings.js',
  'icon-192.png',
  'icon-512.png'
  // Plus besoin des fichiers audio ici !
];

// ... (le reste du fichier sw.js ne change pas) ...
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert et mis à jour (v3)');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
