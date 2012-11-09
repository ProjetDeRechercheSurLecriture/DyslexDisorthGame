'use strict';

/* Services */


angular.module('phophloServices', ['ngResource']).
	factory('Child', function($resource){
		return $resource('data/child.json', {}, {
			query: {method:'GET', params:{participantID:'childs'}, isArray:true}
		});
	}).factory('Session', function($resource){
		return $resource('data/session_data.json', {}, {
			query: {method:'GET', params:{sessionID:'sessions'}, isArray:true}
		});
	});
