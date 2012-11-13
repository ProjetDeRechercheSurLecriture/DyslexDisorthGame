'use strict';

/* Controllers */

function SessionListCtrl($scope, $resource, Child, Session, GetNewUUID, PostToCouch) {

//Query data; assign to template scope
	
	$scope.sessions = Session.query();
  
	$scope.childs = Child.query();
	
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
	
/* REWRITE this function to add/modify a single record */
		
	$scope.pushToCouch = function (dataToPost)	{
		var NewUUID;
		var pushToURL;
		var recordToPush;
		var tempData
		var i = 0;
		var interval = setInterval(function(){
			(function(i) {
				NewUUID = GetNewUUID.query(function() {
					tempData = dataToPost[i];
					delete tempData.$$hashKey;
					recordToPush = JSON.stringify(tempData);
					PostToCouch.save({UUID: NewUUID.uuids}, recordToPush);
				});
			}(i));
			i++;
			if (i >= dataToPost.length) {
			clearInterval(interval);
			}
		}, 1000);
	}	

/* END rewrite */	
}

function SessionReportCtrl($scope, $routeParams) {

//Limit value of sessionID in template to value of sessionID in routeParams
	
	$scope.filterProp = $routeParams.sessionID;

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

/* REWRITE this function to use CouchDB */	
	
//Save (edited) template content to local storage; key = sessionID
	
	$scope.saveChanges = function(editedSession) {
		var descriptionText = document.getElementById('description_text').innerHTML;
		var discussionText = document.getElementById('discussion_text').innerHTML;
		editedSession = {"id": editedSession, "discussionEditedText" : discussionText, "descriptionEditedText" : descriptionText};
		localStorage.setItem(editedSession.id, JSON.stringify(editedSession));
	};
	
}

function ParticipantReportCtrl($scope, $routeParams) {

//Limit value of participantID in template to value of participantID in routeParams	
	
	$scope.filterProp = $routeParams.participantID;

}

/* REWRITE this function to use CouchDB */

//Check to see if the description and discussion fields in the session
//have been updated (saved in localStorage); Call this controller inside
//ng-repeat to ensure a unique sessionID

function CheckEditableFieldsCtrl($scope) {
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
