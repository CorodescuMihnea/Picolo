// Get 
let CACHE_NAME = 'img-cache-v1';
let urlsToCache = [];

self.addEventListener('install', function(event) {
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

// get urls to proccess and cache
var urlsToCache = [
];

event.waitUntil(
	caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
			
			return cache.addAll(urlsToCache);
		})