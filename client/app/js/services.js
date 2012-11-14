'use strict';

/* Services */


angular.module('phophloServices', ['ngResource']).
	factory('Child', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/_design/participants/_view/all', {}, {
			query: {method:'GET', isArray:false}
		});
	}).factory('Session', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/_design/sessions/_view/all', {}, {
			query: {method:'GET', isArray:false}
		});
	}).factory('GetNewUUID', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/:UUID', {}, {
			query: {method:'GET', params:{UUID: '_uuids'}, isArray:false}
		});
	}).factory('AccessCouch', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/:UUID', {}, {
			query: {method: 'GET'}, save: {method:'POST'}
		});
	});

