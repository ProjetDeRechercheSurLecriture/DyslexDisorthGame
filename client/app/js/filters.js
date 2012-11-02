'use strict';

/* Filters */

angular.module('headphoneFilter', []).filter('checkmark', function() {
	return function(input) {
		return input===1 ? '\u2713' : '\u2718';
	};
});
