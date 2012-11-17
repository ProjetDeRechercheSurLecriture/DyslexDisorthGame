'use strict';


// Declare app level module which depends on filters, and services
angular.module('PhoPhloApp', ['searchFilters', 'phophloServices']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/sessions', {templateUrl: 'partials/results_main.html',   controller: MainCtrl}).
		when('/sessions/:sessionID', {templateUrl: 'partials/session_report.html', controller: SessionReportCtrl}).
		when('/participants/:participantID', {templateUrl: 'partials/participant_report.html', controller: ParticipantReportCtrl}).
		otherwise({redirectTo: '/sessions'});
}]).directive('contenteditable', function() {
    	return {
    		restrict: 'A', // only activate on element attribute
    		require: '?ngModel', // get a hold of NgModelController
    		link: function(scope, element, attrs, ngModel) {
    			if(!ngModel) return; // do nothing if no ng-model
   
    			// Specify how UI should be updated
    			ngModel.$render = function() {
    				element.html(ngModel.$viewValue || '');
    			};
   
    			// Listen for change events to enable binding
    			element.bind('focus blur keyup change', function() {
    				scope.$apply(read);
    			});
    			read(); // initialize
   
    			// Write data to the model
    			function read() {
    				ngModel.$setViewValue(element.html());
    			}
        }
      };
    }).directive('forceModelUpdate', function($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                scope.$on('event:force-model-update', function() {
                    ctrl.$setViewValue(element.val());
                });
            }
        }
    });;
