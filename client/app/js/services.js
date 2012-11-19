'use strict';

/* Services */


angular.module('phophloServices', ['ngResource']).
	factory('Participant', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/_design/participants/_view/all', {}, {
			query: {method:'GET', isArray:false}, save: {method:'POST'}
		});
	}).factory('Session', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/_design/sessions/_view/all', {}, {
			query: {method:'GET', isArray:false}
		});
	}).factory('AccessCouch', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/:UUID', {}, {
			query: {method: 'GET'}, save: {method:'POST'}, update: {method:'PUT'}
		});
	});

