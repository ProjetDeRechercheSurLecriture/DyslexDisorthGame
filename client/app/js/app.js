'use strict';


// Declare app level module which depends on filters, and services
angular.module('participantData', ['headphoneFilter']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/sessions', {templateUrl: 'partials/search_results.html',   controller: SessionListCtrl}).
		when('/sessions/:sessionID', {templateUrl: 'partials/report.html', controller: SessionReportCtrl}).
		otherwise({redirectTo: '/sessions'});
}]);
