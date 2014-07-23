/**
 * Listens for the app launching then creates the window.
 * Ignores the provided window size.
 *
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
 chrome.app.runtime.onLaunched.addListener(function(launchData) {

 	chrome.app.window.create('index.html', {
 		frame: "none",
 		width: 1280,
 		height: 800,
 	}, function(win) {
 		win.launchData = launchData;
 	});

 	// chrome.app.window.create('sandbox.html', {
 		
 	// 	frame: "none",
 	// 	width: 1024,
 	// 	height: 768,
 	// }, function(win) {
 	// 	win.launchData = launchData;
 	// });

 });
