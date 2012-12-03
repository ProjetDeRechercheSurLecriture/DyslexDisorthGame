'use strict';
angular.module('PushFakeDataServices', ['ngResource']).
factory('LocalFakeData', function($resource){
	return $resource('data/temp.json', {}, {
		query: {method:'GET'}
	});
}).factory('CouchFakeData', function($resource){
	return $resource('https://semisecureadmin:none@wentworthinspections.iriscouch.com/alliedbiscuitinspections/', {}, {
		query: {method:'GET', isArray:false}, save: {method:'POST'}
	});
});