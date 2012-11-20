'use strict';


// Declare app level module which depends on filters, and services
angular.module('PhoPhloApp', ['searchFilters', 'phophloServices']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/test', {templateUrl: 'partials/main_menu.html'}).
		when('/register', {templateUrl: 'partials/register.html', controller: NewUserCtrl}).
		when('/reports', {templateUrl: 'partials/reports.html'}).
		when('/sessions', {templateUrl: 'partials/results_main.html'}).
		when('/sessions/:sessionID', {templateUrl: 'partials/session_report.html', controller: SessionReportCtrl}).
		when('/participants/:participantID', {templateUrl: 'partials/participant_report.html', controller: ParticipantReportCtrl}).
		otherwise({redirectTo: '/test'});
}]).
directive('onFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('focus', function() {
//                scope.query = "";
            	scope.$apply(attrs.onFocus);                
            });
        }
    };        
}).
directive('onBlur', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('blur', function() {
                scope.$apply(attrs.onBlur);
            });
        }
    };        
}).
directive('ngEnter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.charCode === 13) {
            	scope.$apply(attrs.ngEnter);
            	elm[0].blur();
            };
            
        });
    };
});;