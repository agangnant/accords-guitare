// sw.js (version finale corrigée)

// 1. On change le nom du cache pour forcer la mise à jour
const CACHE_NAME = 'accords-guitare-cache-v2';

// 2. ON AJOUTE TOUS LES NOUVEAUX FICHIERS ICI
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'css/style.css',      // <-- AJOUTÉ
  'js/app.js',          // <-- AJOUTÉ
  'data/voicings.js',   // <-- AJOUTÉ
  'icon-192.png',
  'icon-512.png'
];

// Le reste du code ne change pas, il est correct.

// Étape d'installation : on ouvre le cache et on y met les fichiers.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert et mis à jour (v2)');
        return cache.addAll(urlsToCache);
      })
  );
});

// Étape de fetch : on intercepte les requêtes réseau.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne.
        if (response) {
          return response;
        }
        // Sinon, on va la chercher sur le réseau.
        return fetch(event.request);
      }
    )
  );
});

// Étape d'activation : on supprime les anciens caches
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
