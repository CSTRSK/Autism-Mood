// Autism Mood PWA Service Worker v2
const CACHE = 'autism-mood-v2';
const ASSETS = [
  '/Autism-Mood/',
  '/Autism-Mood/index.html',
  '/Autism-Mood/add.html',
  '/Autism-Mood/faq.html',
  '/Autism-Mood/manifest.json',
  '/Autism-Mood/sw.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      try { cache.addAll(ASSETS); } catch(e) {}
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE; }).map(function(n) { return caches.delete(n); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);
  // Only cache same-origin Autism-Mood requests
  if (url.origin === location.origin && url.pathname.startsWith('/Autism-Mood/')) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
          }
          return response;
        });
      })
    );
  }
  // Don't interfere with CDN, tracking, ads, Amazon etc.
});
