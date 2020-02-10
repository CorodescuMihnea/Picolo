if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(
		'localhost:8008/public/worker/worker.js', 
		{scope: '/'})
  .then((reg) => {
    // registration worked
		console.log('Registration succeeded. Scope is ' + reg.scope);
		navigator.serviceWorker.controller.postMessage({
			"domain": "",
			"quality": "",
			"loseless": false
		});
  }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}