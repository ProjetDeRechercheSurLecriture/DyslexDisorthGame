'use strict';

/* Controllers */

function SessionListCtrl($scope, $http) {
  $http.get('data/session_data.json').success(function(data) {
    $scope.sessions = data;
  });
  
  $http.get('data/child.json').success(function(data) {
	$scope.childs = data;
  });
  
  $scope.orderProp = 'participantID';
  
  
  //GET RID OF THIS AND REFACTOR USING ROUTES
  $scope.displayReport = function(sessionID) {
	  document.getElementById('span-sessionID').innerHTML=sessionID;
	  document.getElementById('angularTest').innerHTML="TEST";
	  var data = $http.get('data/session_data.json');
	  data = JSON.parse(data);
	  window.alert(data[0].participantID);
	  
	  
  }
}

//PartcipantListCtrl.$inject = ['$scope', '$http'];
