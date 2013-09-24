console.log("Loading the SAILS module.");

define(["angular", "app/modules/sails/js/controllers/SAILSController",
	"app/modules/sails/js/directives/SAILSDirectives", "app/modules/sails/js/filters/SAILSFilters", "app/modules/sails/js/services/SAILSServices", "app/modules/phophlo/js/directives/PhoPhloDirectives", "app/modules/phophlo/js/services/PhoPhloServices"
], function(angular, SAILSController,
	SAILSDirectives, SAILSFilters, SAILSServices, PhoPhloDirectives, PhoPhloServices) {
	/**
	 * The main SAILS module.
	 *
	 * @type {angular.Module}
	 */

	'use strict';

	var SAILS = angular.module('SAILS', ['SAILS.services', 'SAILS.directives', 'SAILS.filters', 'PhoPhlo.directives', 'PhoPhlo.services']).config(
		['$routeProvider',
			function($routeProvider) {
				window.SAILSController = SAILSController;
				console.log("Initializing the SAILS module.");
				$routeProvider.when('/sails', {
					templateUrl: 'partials/main.html'
				}).when('/sails/experiment', {
					templateUrl: 'partials/sails.html'
				}).when('/sails/congratulations', {
					templateUrl: 'partials/sails_select_user.html'
				}).otherwise({
					redirectTo: '/sails'
				});
			}
		]);
	return SAILS;
});