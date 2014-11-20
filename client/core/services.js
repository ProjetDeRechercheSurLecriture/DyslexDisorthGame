'use strict';

/* Services */


angular.module('dyslexdisorthServices', ['ngResource']).
	factory('Participants', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/dyslexdisorth/_design/participants/_view/all', {}, {
			query: {method:'GET', isArray:false}, save: {method:'POST'}
		});
	}).factory('Sessions', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/dyslexdisorth/_design/sessions/_view/all', {}, {
			query: {method:'GET', isArray:false}
		});
	}).factory('AccessCouch', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/dyslexdisorth/:UUID', {}, {
			query: {method: 'GET'}, save: {method:'POST'}, update: {method:'PUT'}
		});
	}).factory('Session', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/dyslexdisorth/:UUID', {}, {
			query: {method: 'GET'}, save: {method:'POST'}, update: {method:'PUT'}
		});
	}).factory('ParticipantAutocomplete', function($resource){
		return $resource('https://senhorzinho.iriscouch.com/dyslexdisorth/_design/participants/_view/autocomplete', {}, {
			query: {method:'GET', isArray:false}, save: {method:'POST'}
		});
	});

