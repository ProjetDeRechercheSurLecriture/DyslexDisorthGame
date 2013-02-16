'use strict';


// Declare app level module which depends on filters, and services
angular.module('PhoPhloApp', ['searchFilters', 'phophloServices']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/test', {templateUrl: 'modules/experiment/partials/main_menu.html'}).
		when('/register', {templateUrl: 'modules/participant/partials/register.html', controller: NewUserCtrl}).
		when('/test/sails', {templateUrl: 'modules/sails/partials/sails.html', controller: SAILSCtrl}).
		when('/test/sails/congratulations', {templateUrl: 'modules/sails/partials/sails_select_user.html', controller: SAILSCtrl}).
		when('/test/tcpp', {templateUrl: 'modules/tcpp/partials/tcpp.html', controller: TCPPCtrl}).
		when('/test/tcpp/congratulations', {templateUrl: 'modules/tcpp/partials/tcpp_select_user.html', controller: TCPPCtrl}).
		when('/test/tdfm', {templateUrl: 'modules/tdfm/partials/tdfm.html', controller: TDFMCtrl}).
		when('/test/tdfm/congratulations', {templateUrl: 'modules/tdfm/partials/tdfm_select_user.html', controller: TDFMCtrl}).
		when('/test/tdfp', {templateUrl: 'modules/tdfp/partials/tdfp.html', controller: TDFPCtrl}).
		when('/test/tdfp/congratulations', {templateUrl: 'modules/tdfp/partials/tdfp_select_user.html', controller: TDFPCtrl}).
		when('/reports/organization/:participantID', {templateUrl: 'modules/report/partials/organization_report.html', controller: ReportsCtrl}).
		when('/reports/parents/:participantID', {templateUrl: 'modules/report/partials/parents_report.html', controller: ReportsCtrl}).
		when('/reports/child/:participantID', {templateUrl: 'modules/report/partials/child_report.html', controller: ReportsCtrl}).
		when('/reports', {templateUrl: 'modules/report/partials/reports.html'}).
		when('/sessions', {templateUrl: 'modules/report/partials/results_main.html'}).
		when('/sessions/:sessionID', {templateUrl: 'modules/report/partials/session_report.html', controller: SessionReportCtrl}).
		when('/participants/:participantID', {templateUrl: 'modules/report/partials/participant_report.html', controller: ParticipantReportCtrl}).
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
});