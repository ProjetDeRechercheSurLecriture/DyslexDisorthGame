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
		
		var tempID = $routeParams.sessionID;
		var storedID = JSON.parse(localStorage.getItem(tempID));
		if (storedID != undefined) {
			$scope.sessionReport.discussionEdit = storedID.discussionEditedText;
		}
	});
	
	$scope.saveChanges = function(session) {
		var descriptionText = document.getElementById('description_text').innerHTML;
		var discussionText = document.getElementById('discussion_text').innerHTML;
		session = {"id": session, "discussionEditedText" : discussionText};
		localStorage.setItem(session.id, JSON.stringify(session));
	};
	$scope.toggleEditButtons = function() {
		var descriptionField = document.getElementById('description_text');
		var discussionField = document.getElementById('discussion_text');
		var editButton = document.getElementById('edit');
		var cancelSaveButton = document.getElementById('cancel_save');

		if (descriptionField.contentEditable == 'false') {
			descriptionField.contentEditable = 'true';
			discussionField.contentEditable = 'true';
			editButton.style.display = 'none';
			cancelSaveButton.style.display = 'block';
		}
		else {
			descriptionField.contentEditable = 'false';
			discussionField.contentEditable = 'false';
			editButton.style.display = 'block';
			cancelSaveButton.style.display = 'none';
			document.location.reload(true);
		};
	};
	
}

//PartcipantListCtrl.$inject = ['$scope', '$http'];
