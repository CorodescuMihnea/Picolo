let CACHE_NAME = 'img-cache-v1';
let urlsToCache = [];

self.addEventListener('install', function(event) {
	console.log("Installing the mofo");
	event.waitUntil(
		caches.open(CACHE_NAME)
	)
});

self.addEventListener('activate', function(event) {
  // Clean cache
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
    caches.match(event.request)
  );
});