'use strict';

/* Controllers */

function SessionListCtrl($scope, $http) {
  $http.get('data/session_data.json').success(function(data) {
    $scope.sessions = data;
  });
  
  $scope.orderProp = 'participantID';
}

function ChildListCtrl($scope, $http) {
	$http.get('data/child.json').success(function(data) {
		$scope.childs = data;
	});
}	

//PartcipantListCtrl.$inject = ['$scope', '$http'];
