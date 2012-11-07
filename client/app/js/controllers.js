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

  $scope.displaySearchResults = function(resultsCount) {
		var resultsdiv = document.getElementById('results');
		var noresultsdiv = document.getElementById('no_results');
	    if (resultsCount == 0) {
	        resultsdiv.style.display = 'none';
	        noresultsdiv.style.display = 'block';
	    }
	    else {
	        resultsdiv.style.display = 'block';
	        noresultsdiv.style.display = 'none';
	    }
	};
}

function SessionReportCtrl($scope, $routeParams, $http) {
	$http.get('data/session_data.json').success(function(data) {
		angular.forEach(data, function(record) {
			if (record.sessionID == $routeParams.sessionID)
				$scope.sessionReport = record;
		});
	});
}

//PartcipantListCtrl.$inject = ['$scope', '$http'];
