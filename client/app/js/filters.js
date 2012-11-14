'use strict';

/* Filters */

angular.module('searchFilters', []).
filter('checkmark', function() {
	return function(input) {
		return input==1 ? '\u2713' : '\u2718';
	};
}).
filter('startFrom', function() {
	return function(input, start) {
		if (input == undefined) {
			return;
		}
		else {
			start = +start; //parse to int
			return input.slice(start);
		}
	}
});

