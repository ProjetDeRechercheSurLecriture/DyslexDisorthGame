'use strict';

/* Controllers */

function MainCtrl($scope, $resource, Child, Session, GetNewUUID, AccessCouch) {

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

//Show/hide Edit/Cancel buttons; make template content (non)editable	
	
	$scope.toggleEditButtons = function() {
		var descriptionField = document.getElementById('descriptionEdit');
		var discussionField = document.getElementById('discussionEdit');
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
		};
	};
	
//Save changes made to edited fields; push changes to CouchDB
//NOTE: all HTML ids must match db ids exactly; first argument must always be UUID of current db document	

/*Add some sort of spinner while saving*/
	
	$scope.saveChanges = function() {
		var itemsToEdit = arguments;
		var currentUUID = itemsToEdit[0];
		var updatedRecord = AccessCouch.query({UUID: currentUUID}, function(){
			for (var i = 1; i < itemsToEdit.length; i++) {		
				var dataToPost = document.getElementById(itemsToEdit[i]).innerHTML;
				var itemID = itemsToEdit[i];
				updatedRecord[itemID] = dataToPost;
			}
			updatedRecord.$save();
			location.reload();
		});			
	}
	
}

function SessionReportCtrl($scope, $routeParams) {

//Set template filter value to value of sessionID in routeParams
	
	$scope.filterProp = $routeParams.sessionID;
	
}

function ParticipantReportCtrl($scope, $routeParams) {

//Set template filter value to value of participantID in routeParams	
	
	$scope.filterProp = $routeParams.participantID;

}

//PartcipantListCtrl.$inject = ['$scope', '$http'];
