'use strict';

/* Controllers */

function ParticipantListCtrl($scope, $http) {
  $http.get('data/participant_data.json').success(function(data) {
    $scope.participants = data;
  });
  
  $scope.orderProp = 'participantID';
}

function ChildListCtrl($scope, $http) {
	$http.get('data/child.json').success(function(data) {
		$scope.childs = data;
	});
}	

//PartcipantListCtrl.$inject = ['$scope', '$http'];
