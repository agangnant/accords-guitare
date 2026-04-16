const CACHE_NAME = 'accords-guitare-cache-v1';
// IMPORTANT : Listez ici tous les fichiers que votre application utilise.
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
  // Si vous avez un fichier CSS, ajoutez-le ici, par exemple : 'style.css'
];

// Étape d'installation : on ouvre le cache et on y met les fichiers.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
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
