console.log("Loading the SAILS main");

// Set the RequireJS configuration
require.config({
	paths : {
		/* AngularJS */
		"angular" : "libs/angular/angular",
		"angular-resource" : "libs/angular/angular-resource",
		"bootstrap": "libs/angular-ui/ui-bootstrap.min"
	},
	shim : {
		"angular" : {
			exports : "angular"
		},
		"angular-resource" : {
			deps : [ "angular" ],
			exports : "angular"
		},
		"bootstrap": {
			deps: ["angular-resource"],
			exports: "angular"
		}
	}
});

/*
 * Declare only the variables that are needed here, the dependencies of the rest
 * will be discovered and loaded as needed by require.js
 */
require([ "bootstrap", "angular-resource", "js/module" ],
		function(angular, SAILS) {
	console.log("Initializing the SAILS page.");

	angular.bootstrap(document, [ 'SAILS' ]);
});