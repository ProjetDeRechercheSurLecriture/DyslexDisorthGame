console.log("Loading the SAILS module.");

'use strict';
define(["angular", "js/controllers/SAILSController",
	"js/directives/SAILSDirectives", "js/filters/SAILSFilters", "js/services/SAILSServices", "js/phophlo/directives/PhoPhloDirectives", "js/phophlo/services/PhoPhloServices"
], function(angular, SAILSController,
	SAILSDirectives, SAILSFilters, SAILSServices, PhoPhloDirectives, PhoPhloServices) {
	/**
	 * The main SAILS module.
	 *
	 * @type {angular.Module}
	 */

	var SAILS = angular.module('SAILS', ['SAILS.services', 'SAILS.directives', 'SAILS.filters', 'PhoPhlo.directives', 'PhoPhlo.services']).config(
		['$routeProvider',
			function($routeProvider) {
				window.SAILSController = SAILSController;
				console.log("Initializing the SAILS module.");
				$routeProvider.when('/sails', {
					templateUrl: 'partials/main.html',
					controller: SAILSController
				}).when('/sails/experiment', {
					templateUrl: 'partials/sails.html',
					controller: SAILSController
				}).when('/sails/congratulations', {
					templateUrl: 'partials/sails_select_user.html',
					controller: SAILSController
				}).otherwise({
					redirectTo: '/sails'
				});
			}
		]);
	return SAILS;
});