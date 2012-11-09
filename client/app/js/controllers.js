'use strict';

/* Controllers */

function SessionListCtrl($scope, $http) {

//Get data; assign to template scope
	
	$http.get('data/session_data.json').success(function(data) {
		$scope.sessions = data;
	});
  
	$http.get('data/child.json').success(function(data) {
		$scope.childs = data;
	});
  
	$scope.orderProp = 'participantID';

//Test to see if text in search box returns any results and hide/display divs accordingly	
	
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

//Limit value of sessionID in template to value of sessionID in routeParams
	
	$scope.sessions.sessionID = $routeParams.sessionID;

//Show/hide Edit/Cancel buttons; make template content (non)editable	
	
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

//Save (edited) template content to local storage; key = sessionID
	
	$scope.saveChanges = function(editedSession) {
		var descriptionText = document.getElementById('description_text').innerHTML;
		var discussionText = document.getElementById('discussion_text').innerHTML;
		editedSession = {"id": editedSession, "discussionEditedText" : discussionText, "descriptionEditedText" : descriptionText};
		localStorage.setItem(editedSession.id, JSON.stringify(editedSession));
	};
	
}

function ParticipantReportCtrl($scope, $routeParams, $http) {

//Limit value of participantID in template to value of participantID in routeParams	
	
	$scope.sessions.participantID = $routeParams.participantID;

}

//Check to see if the description and discussion fields in the session
//have been updated (saved in localStorage); Call this controller inside
//ng-repeat to assure a unique sessionID

function CheckEditableFieldsCtrl($scope, $http) {
	var currentSession = $scope.session.sessionID;
	var storedID = JSON.parse(localStorage.getItem(currentSession));
	try {
		if (storedID.descriptionEditedText != undefined) {
			$scope.session.descriptionEdit = storedID.descriptionEditedText;
		}
	}
	catch(e) {
		return
	};
	try {
		if (storedID.discussionEditedText != undefined) {
			$scope.session.discussionEdit = storedID.discussionEditedText;
		}
	}
	catch(e) {
		return
	};

}
//PartcipantListCtrl.$inject = ['$scope', '$http'];
