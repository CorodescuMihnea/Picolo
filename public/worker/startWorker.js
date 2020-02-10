if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(
		'<%= workerUrl %>', 
		{scope: '/worker/'}
	).then((reg) => {
		console.log('Registration succeeded. Scope is ' + reg.scope);
		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			return serviceWorkerRegistration.pushManager.getSubscription();
		}).then(function(subscription) {
			navigator.serviceWorker.controller.postMessage({
				"domain": "<%= domain %>",
				"imgUrl": "<%= imgUrl %>",
				"lossy": "<%= lossy %>",
				"quality": "<%= quality %>"
			});
		})
	}).catch((error) => {
		console.log('Registration failed with ' + error);
	});
}