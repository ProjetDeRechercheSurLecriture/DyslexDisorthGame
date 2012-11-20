'use strict';

/* Controllers */

function MainCtrl($scope, $resource, Participant, Session, AccessCouch) {

//Query data; assign to template scope; initialize default values
	
	$scope.sessions = Session.query();  
	$scope.childs = Participant.query();
	$scope.searching = 'true';
	$scope.editing = 'false';
	
//Test to see if text in search box returns any results and hide/display divs accordingly	
	
	$scope.displaySearchResults = function(resultsCount) {	
		if (resultsCount == 0) {
			$scope.searching = 'true';
			window.alert('No matching results.');
		}
		else {
			$scope.searching = 'false';
			$scope.orderProp = 'lastName';
			$scope.currentResult = 0;
	    	$scope.resultSize = 1;
	    	$scope.numberOfResultPages = function(){
	    		return Math.ceil(resultsCount/$scope.resultSize);
	    	};
	    }
	};
	
//Hide Edit/Show cancel/save buttons; make template content editable via ng-show
	
	$scope.edit = function() {
		$scope.editing = 'true';
	}

/*TRY TO FIND ANOTHER WAY TO REFRESH THE VIEW*/	
	$scope.cancel = function() {
		window.location.reload();
	}	
	
//Save changes made to edited fields; push changes to CouchDB	
	
	$scope.saveRecord = function(records) {
		var newRecord = records;
		var currentUUID = records._id;
		var updatedRecord = AccessCouch.query({UUID: currentUUID}, function() {
			for (key in newRecord) {
				updatedRecord[key] = newRecord[key];
			}
			updatedRecord.$update({UUID: currentUUID});
		});
		$scope.editing = 'false';
	};
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
	};
	
	$scope.createNewUser = function(data) {
			var currentParticipantIDs = Participant.query(function() {
				var newParticipantID = generateNewParticipantID(currentParticipantIDs);
				if (newParticipantID == undefined) {
					window.alert("Please try again."); //should this just call generateNewParticipantID() again? 
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
