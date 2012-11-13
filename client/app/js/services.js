'use strict';

/* Services */


angular.module('phophloServices', ['ngResource']).
	factory('Child', function($resource){
		return $resource('data/child.json', {}, {
			query: {method:'GET', isArray:true}
		});
	}).factory('Session', function($resource){
		return $resource('data/session_data.json', {}, {
			query: {method:'GET', isArray:true}
		});
	}).factory('CouchTest', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/phophlo/b2b074467a290c22c8bcf451cf0008df', {}, {
			query: {method:'GET', isArray:false}
		});
	});

