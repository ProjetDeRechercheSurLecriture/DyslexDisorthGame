/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var ContextualizableComponent = require("oprime-montage/core/contextualizable-component").ContextualizableComponent;

var enLocales = require("oprime-montage/locale/en/messages.json");
var frLocales = require("oprime-montage/locale/fr/messages.json");


/**
 * @class Main
 * @extends ContextualizableComponent
 */
exports.Main = ContextualizableComponent.specialize( /** @lends Main# */ {
	constructor: {
		value: function Main() {
			// localStorage.setItem("montage_locale", "fr");
			this.super();

			this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
			this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
			this.application.interfaceLocale = {
				"iso": "fr",
				"name": "French",
				"nativeName": "français"
			};
			this.contextualizer.currentLocale = this.application.interfaceLocale.iso;
			this.application.contextualizer = this.contextualizer;
			// console.log(this.contextualizer);


		}
	},
	enterDocument: {
		value: function(firstTime) {
			if (firstTime) {
				console.log("Setting up sails link", document.getElementById("goToSails"));
				if (document.getElementById("goToSails")) {
					document.getElementById("goToSails").onclick = function(e) {
						var action_url = e.target.href;
						console.log("Going to sails link" + action_url);
						chrome.tabs.create({
							url: action_url
						});
					};
				}


				this.super(firstTime);
			}
		}
	}
});


// var goToCorpusPagesApp = function(){
// 	var action_url = "https://www.lingsync.org/public";
// 	chrome.tabs.create({
// 		url: action_url
// 	});
// }
// document.getElementById("goToCorpusPagesApp").onclick = goToCorpusPagesApp;



// var goToSpreadsheetApp = function(){
// 	var action_url = "http://app.lingsync.org";
// 	chrome.tabs.create({
// 		url: action_url
// 	});
// }
// document.getElementById("goToSpreadsheetApp").onclick = goToSpreadsheetApp;


// var seeChromeBlog = function(){
// 	var action_url = "http://blog.chromium.org/2012/11/restricting-extension-apis-in-legacy.html";
// 	chrome.tabs.create({
// 		url: action_url
// 	});
// }
// document.getElementById("seeChromeBlog").onclick = seeChromeBlog;
