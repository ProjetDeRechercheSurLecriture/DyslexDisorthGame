console.log("Loading the PhoPhlo Main");

// Set the RequireJS configuration
require.config({
	paths : {
		/* Twitter Bootstrap javascript files */
		"bootstrap" : "../../libs/bootstrap/js/bootstrap",

		/* jQuery */
		"jquery" : "../../libs/jquery",

		/* AngularJS */
		"angular" : "../../libs/angular/angular",
		"angular-resource" : "../../libs/angular/angular-resource",
		
		/* HTML5 libraries to interact with Android Tablet */
		"OPrime" : "../../libs/oprime/OPrime",
	},
	shim : {
		"jquery" : {
			exports : "$"
		},
		"bootstrap" : {
			deps : [ "jquery" ],
			exports : "$"
		},
		"angular" : {
			exports : "angular"
		},
		"angular-resource" : {
			deps : [ "angular" ],
			exports : "angular"
		},
		"OPrime" : {
			exports : "OPrime"
		}
	}
});

/*
 * Declare only the variables that are needed here, the dependencies of the rest
 * will be discovered and loaded as needed by require.js
 */
require([ "bootstrap", "angular-resource", "../phophlo/module" ],
		function($, angular, PhoPhlo) {
	console.log("Initializing the PhoPhlo page.");

	angular.bootstrap(document, [ 'PhoPhlo' ]);
});