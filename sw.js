// On incrémente la version du cache car on a changé la liste des fichiers
const CACHE_NAME = 'accords-guitare-cache-v5';

const urlsToCache = [
  './', // CORRECTION : Le point de départ correct pour GitHub Pages
  './index.html',
  './manifest.json',
  './css/style.css',
  './data/voicings.js',
  './js/app.js',
  './js/AudioEngine.js', // AJOUT : Fichier essentiel
  './js/Fretboard.js',   // AJOUT : Fichier essentiel
  './icon-192.png',
  './icon-512.png'
];

// Événement d'installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert et mis à jour (v5)');
        return cache.addAll(urlsToCache);
      })
  );
});

// Événement de fetch (pour servir depuis le cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on la récupère sur le réseau
        return fetch(event.request);
      })
  );
});

// Événement d'activation (pour nettoyer les anciens caches)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Suppression de l\'ancien cache :', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
