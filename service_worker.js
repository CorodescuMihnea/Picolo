
self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.clients.matchAll().then(clients => {
  clients.forEach(client => client.postMessage({msg: 'Hello from SW'}));
})

self.addEventListener('message', function(event) {
    var data = event.data;
    var url=data.url;
    var width=data.width;
    var height=data.height;


    if (data.command == "twoWayCommunication") {
        console.log("Responding to message from the Page: ", data.width);
        event.ports[0].postMessage({
            "message": "Hi, Page"
        });
    }
});