console.log("Loading the PhoPhlo module.");

'use strict';
define([ "angular", "controllers/PhoPhloController",
		"directives/PhoPhloDirectives", "filters/PhoPhloFilters",
		"services/PhoPhloServices" ], function(angular, PhoPhloController,
				PhoPhloDirectives, PhoPhloFilters, PhoPhloServices) {
	/**
	 * The main PhoPhlo module.
	 * 
	 * @type {angular.Module}
	 */

	var PhoPhlo = angular.module('PhoPhlo',
			[ 'PhoPhlo.services', 'PhoPhlo.directives', 'PhoPhlo.filters' ]).config(
			[ '$routeProvider', function($routeProvider) {
				window.PhoPhloController = PhoPhloController;
				console.log("Initializing the PhoPhlo module.");
				$routeProvider.when('/phophlo', {
					templateUrl : 'partials/phophlo.html',
					controller : PhoPhloController
				}).otherwise({
					redirectTo : '/phophlo'
				});
			} ]);
	return PhoPhlo;
});