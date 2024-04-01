const CACHE_NAME =  "version-1";
const urlsToCache = [ 'index.html', 'offline.html', 'manifest.json' ];

const self = this;

//install sw
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

//listen for request
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match("offline.html"));
            })
    );
});

//activate the sw
self.addEventListener('active', event => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(cacheName => Promise.all(
            cacheName.map(cacheName => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});