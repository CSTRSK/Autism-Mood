// VERSION 0.0.0.3
try {
    self.addEventListener('install', function(e) {
        e.waitUntil(
            caches.open('charadesbycstrsk').then(cache => {
                return cache.addAll([
                    'https://cstrsk.de/Autism-Mood/index.html',
                    'https://cstrsk.de/Autism-Mood/add.html',
                    'https://cstrsk.de/Autism-Mood/faq.html',
                    'https://cstrsk.de/Autism-Mood/sw.js',
                    'https://cstrsk.de/Autism-Mood/manifest.json',
                    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js'
                ]);
            })
        );
    });
} catch (err) {}
try {
    self.addEventListener('fetch', function(e) {
        e.respondWith(
            caches.match(e.request)
            .then(response => response || fetch(e.request))
        );
    });
} catch (err) {}