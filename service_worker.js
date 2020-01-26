
self.addEventListener('install', (event) => {
  
});


self.addEventListener('message', function(e) {
  self.postMessage("hi");
}, false);

self.clients.matchAll().then(clients => {
  clients.forEach(client => client.postMessage({msg: 'Hello from SW'}));
})