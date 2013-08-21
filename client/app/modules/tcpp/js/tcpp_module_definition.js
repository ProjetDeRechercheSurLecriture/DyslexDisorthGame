console.log("Loading the TCPP module.");

'use strict';
define([ "angular-resource", "OPrime", "TCPPController", "TCPPDirectives", ],
    function() {

      /**
       * The main TCPP module.
       * 
       * @type {angular.Module}
       */
      var TCPP = angular.module('TCPP',
          [/* dependancy injection */'OPrimeApp.directives', 'ui.bootstrap' ])
          .config([ '$routeProvider', function($routeProvider) {
            console.log("Initializing the TCPP module.");
            // $routeProvider.when('/prepare', {
            // templateUrl : 'partials/menu.html',
            // controller : TCPPController
            // }).when('/tutorial', {
            // templateUrl : 'partials/tutorial.html',
            // controller : TCPPController
            // }).when('/tcpp/run', {
            // templateUrl : 'partials/tcpp.html',
            // controller : TCPPController
            // }).when('/tcpp/end', {
            // templateUrl : 'partials/tcpp_select_user.html',
            // controller : TCPPController
            // }).otherwise({
            // redirectTo : '/prepare'
            // });
          } ]);
      OPrime.debug("Declaring the TCPPModule");

      return TCPP;
    });
