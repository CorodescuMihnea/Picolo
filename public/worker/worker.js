function isImage(fetchRequest) {
	return fetchRequest.method === "GET" 
				 && fetchRequest.destination === "image";
}

function processImg(imgBlob, params) {
	let lossy = params.lossy;
	let quality = params.quality;

}

function canUseWebP() {
	var elem = document.createElement('canvas');

	if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}

	// very old browser like IE 8, canvas not supported
	return false;
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
    // caches.match(event.request).then((resp) => {
    //   return resp || fetch(event.request).then((response) => {
    //     return caches.open(REQ_CACHE_NAME).then((cache) => {
		// 			let modifiedResponse = response.clone();
		// 			event.waitUntil(fetch())
		// 			cache.put(event.request, modifiedResponse);				
    //       return modifiedResponse;
    //     });  
    //   });
		// })
		fetch(event.request)
			.then((response) => {
					// return any request that is not an img request
					if (response.ok && response.destination !== "image") return response;
					// request is prolly not an img or a problem was encountered
					let localImgUrl;
					if (isImage(event.request)) {
						fetch(event.request)
							.then(response => response.blob)
							.then(images =>{
								localImgUrl = URL.createObjectURL(images);
								console.log(localImgUrl);
							})
							.catch((err) => {
								console.log(err);
							})
						let resp = new Response();
						return caches.match(request);
					}
			})
			.catch((err) => {
				console.log(err);
					// User is probably offline
			})
  );
});