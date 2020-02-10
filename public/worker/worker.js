function isImage(fetchRequest) {
	return fetchRequest.method === "GET" 
				 && fetchRequest.destination === "image";
}

function processImg(imgBlob, params) {
	let lossy = params.lossy;
	let quality = params.quality;

}

let REQ_CACHE_NAME = 'req-cache-v1';
let IMG_CACHE_NAME = 'img-cache-v1';
let workerParams = {};

self.addEventListener('install', function(event) {
	console.log("Installing the mofo");
	event.waitUntil(
		caches.open(REQ_CACHE_NAME)
	);
	event.waitUntil(
		caches.open(IMG_CACHE_NAME)
	);
});

// self.addEventListener('activate', function(event) {
//  // Clean cache
// });

self.addEventListener('message', event => {
	console.log(`[Message] event: `, event.data);
	workerParams = event.data;
});

self.addEventListener('fetch', (event) => {
	console.log(event.request);
  event.respondWith(
    caches.match(event.request).then((resp) => {
			return resp || fetch(event.request)
				.then((response) => {
					return caches.open(REQ_CACHE_NAME)
						.then((cache) => {				
							if (response.ok && event.request.destination !== "image") {
								console.log(response.clone());
								cache.put(event.request, response.clone());
								return response;
							} else if (isImage(event.request)) {
								// Do processing and caching
								// response = processImg(response.clone().blob(), workerParams);
								const reqUrl = "http://localhost:8008/process";
								const payload = {method: 'POST', body: response.clone().body};
								const processingRequest = new Request(reqUrl, payload);
								console.log(processingRequest);
								// fetch(processingRequest)
								// 	.then((response) => {
								// 		console.log(response.clone())
								// 		cache.put(event.request, response.clone());
								// 		return response;
								// 	})
								cache.put(event.request, response.clone());
								return response;
							}
        		});  
      	});
		})
	)
})