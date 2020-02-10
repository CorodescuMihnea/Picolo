function canUseWebP() {
	var elem = document.createElement('canvas');
	if (!!(elem.getContext && elem.getContext('2d'))) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}
	return false;
}

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
				"webp": canUseWebP(),
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