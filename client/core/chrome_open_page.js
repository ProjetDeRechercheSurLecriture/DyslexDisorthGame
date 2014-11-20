/**
 * Listens
 for the app launching then creates the window.
 * Ignores the provided window size.
 *
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
// chrome.app.runtime.onLaunched.addListener(function(launchData) {

// 	chrome.app.window.create('dyslexdisorth.html', {
// 		frame: "none",
// 		width: 1280,
// 		height: 800,
// 	}, function(win) {
// 		win.launchData = launchData;
// 	});


// 	// chrome.app.window.create('sandbox.html', {

// 	// 	frame: "none",
// 	// 	width: 1024,
// 	// 	height: 768,
// 	// }, function(win) {
// 	// 	win.launchData = launchData;
// 	// });

// });

var openPage = function(e) {
	var action_url = e.target.parentElement.getAttribute("href");
	// console.log("Going to sails link" + action_url);
	// chrome.tabs.create({
	// 	url: action_url
	// });

	// chrome.app.window.create(action_url, {
	// 	frame: "none",
	// 	width: 1280,
	// 	height: 800,
	// }, function(win) {
	// 	win.launchData = {};
	// });
	window.open(action_url)
};

console.log("Setting up sails link", document.getElementById("goToSails"));
if (document.getElementById("goToSails")) {
	document.getElementById("goToSails").onclick = openPage;
	console.log("Setting up tcpp link", document.getElementById("goToTcpp"));
	document.getElementById("goToTcpp").onclick = openPage;
	console.log("Setting up tdfp link", document.getElementById("goToTdfp"));
	document.getElementById("goToTdfp").onclick = openPage;
	console.log("Setting up tdfm link", document.getElementById("goToTdfm"));
	document.getElementById("goToTdfm").onclick = openPage;
	console.log("Setting up mcgill link", document.getElementById("goToMcgill"));
	document.getElementById("goToMcgill").onclick = openPage;

	goToMcgill
}
