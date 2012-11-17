'use strict';

/* Controllers */

function MainCtrl($scope, $resource, Participant, Session, GetNewUUID, AccessCouch) {

//Query data; assign to template scope; initialize default values
	
	$scope.sessions = Session.query();  
	$scope.childs = Participant.query();
	$scope.orderProp = 'participantID';
	$scope.searching = 'true';
	$scope.editing = 'false';
	
//Test to see if text in search box returns any results and hide/display divs accordingly	
	
	$scope.displaySearchResults = function(resultsCount) {	
		if (resultsCount == 0) {
			window.alert('No matching results.');
			$scope.searching = 'true';
		}
		else {
			$scope.searching = 'false';
			$scope.currentResult = 0;
	    	$scope.resultSize = 3;
	    	$scope.numberOfResultPages = function(){
	    		return Math.ceil(resultsCount/$scope.resultSize);
	    	};
	    }
	};

//Hide Edit/Show cancel/save buttons; make template content editable
//NOTE: all HTML ids must match db ids exactly; function('elementID', 'elementID', ...)
	
	$scope.editRecords = function() {
		$scope.$broadcast('event:force-model-update');
		$scope.$broadcast
		$scope.editing = 'true';
		for (var i = 0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).contentEditable = 'true';
		}
	}

//Hide Edit/Show cancel/save buttons; make template content editable
//NOTE: all HTML ids must match db ids exactly; function('elementID', 'elementID', ...)
		
	$scope.cancelRecords = function() {
		for (var i = 0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).contentEditable = 'false';
		}
		window.location.reload();
	}
	
	
//Save changes made to edited fields; push changes to CouchDB
//NOTE: all HTML ids must match db ids exactly; function(UUID, 'elementID', 'elementID', ...)	

/*Add some sort of spinner while saving*/

/*Investigate a cleaner method to do this with ng-models*/	
	
	$scope.saveRecords = function() {
		var itemsToEdit = arguments;
		var currentUUID = itemsToEdit[0];
		var updatedRecord = AccessCouch.query({UUID: currentUUID}, function() {
			for (var i = 1; i < itemsToEdit.length; i++) {		
				var dataToPost = document.getElementById(itemsToEdit[i]).innerHTML;
				var itemID = itemsToEdit[i];
				updatedRecord[itemID] = dataToPost;
				document.getElementById(itemsToEdit[i]).contenteditable = 'false';
			}
			updatedRecord.$save(function() {
				window.location.reload();
			});
		});			
	}	

//Start test
	$scope.testSave = function(currentUUID, data) {
		var updatedRecord = AccessCouch.query({UUID: currentUUID}, function() {
			
//			for (var i = 1; i < itemsToEdit.length; i++) {		
//				document.getElementById(itemsToEdit[i]).contenteditable = 'false';
//			}
			window.alert(JSON.stringify(data));
//				window.location.reload();
		});
//		window.alert(JSON.stringify(data));
			
		
		
		
//		AccessCouch.save(edits, function() {	
//				window.alert($scope.data.firstName);
//				window.alert(JSON.stringify(edits));
//			});
			
	}
	
//End test





};

function SessionReportCtrl($scope, $routeParams) {

//Set template filter value to value of sessionID in routeParams
	
	$scope.filterProp = $routeParams.sessionID;
	
};

function ParticipantReportCtrl($scope, $routeParams) {

//Set template filter value to value of participantID in routeParams	
	
	$scope.filterProp = $routeParams.participantID;

};

function NewUserCtrl($scope, Participant, AccessCouch) {
	
	$scope.cancel = function() {
		location.reload();
	}
	
	$scope.createNewUser = function(data) {
			var currentParticipantIDs = Participant.query(function() {
				var newParticipantID = generateNewParticipantID(currentParticipantIDs);
				if (newParticipantID == undefined) {
					window.alert("Please try again.") //should this just call generateNewParticipantID() again? 
				}
				else {
					data.JSONType = "participant";
					data.participantID = newParticipantID;
					var newUser = AccessCouch.save(data, function() {
						window.alert("New user created. New user Participant ID: " + newParticipantID);
						window.location = "index.html";
					});
				}
			});
			
	};
};

function generateNewParticipantID(data) {
	var randomParticipantID=Math.floor(Math.random()*(999999 - 100000 + 1)) + 100000;
	var duplicatedID;
	//Make sure randomly generated ID doesn't already exist
	for (var i = 0; i < data.rows.length; i++) {
		if (randomParticipantID == data.rows[i].value.participantID) {
			duplicatedID = 1;
		}
		else {
			duplicatedID = 0;
		}
	}
	if (duplicatedID == 0) {
		return randomParticipantID;
	}
	else {
		return;	
	}
}


//PartcipantListCtrl.$inject = ['$scope', '$http'];
