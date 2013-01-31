console.log("Loading the SAILS module.");

'use strict';
define([ "angular", "controllers/SAILSController",
		"directives/SAILSDirectives", "filters/SAILSFilters",
		"services/SAILSServices" ], function(angular, SAILSController,
		SAILSDirectives, SAILSFilters, SAILSServices) {
	/**
	 * The main SAILS module.
	 * 
	 * @type {angular.Module}
	 */

	var SAILS = angular.module('SAILS',
			[ 'SAILS.services', 'SAILS.directives', 'SAILS.filters' ]).config(
			[ '$routeProvider', function($routeProvider) {
				window.SAILSController = SAILSController;
				console.log("Initializing the SAILS module.");
				$routeProvider.when('/sails', {
					templateUrl : 'partials/sails.html',
					controller : SAILSController
				}).otherwise({
					redirectTo : '/sails'
				});
			} ]);
	return SAILS;
});