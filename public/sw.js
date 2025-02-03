const CACHE_NAME = 'akvpn-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/lovable-uploads/f086c916-cb2f-4633-88ad-f94621e7f7ba.png',
  '/lovable-uploads/6b411e54-6efa-4898-a7b8-67efaa004402.png',
  'https://fonts.googleapis.com/css2?family=Nosifer&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});