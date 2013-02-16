console.log("Loading the TCPP main");

// Set the RequireJS configuration
require.config({
  paths : {
    /* AngularJS */
    "angular" : "../libs/angular/angular",
    "angular-resource" : "../libs/angular/angular-resource",

    /* HTML5 libraries to interact with Android Tablet */
    "oprime" : "../libs/oprime/js/oprime",
  },
  shim : {
    "angular" : {
      exports : "angular"
    },
    "angular-resource" : {
      deps : [ "angular" ],
      exports : "angular"
    },
    "oprime" : {
      exports : "OPrime"
    }
  }
});

/*
 * Declare only the variables that are needed here, the dependencies of the rest
 * will be discovered and loaded as needed by require.js
 */
require([ "angular-resource" ], function(angular) {
  console.log("Initializing the TCPP page.");

  angular.bootstrap(document, [ 'TCPP' ]);
});