'use strict';

/* Controllers */

function MainCtrl($scope, $resource, Child, Session, GetNewUUID, AccessCouch) {

//Query data; assign to template scope
	
	$scope.sessions = Session.query();
  
	$scope.childs = Child.query();
	
	$scope.orderProp = 'participantID';
	

//Test to see if text in search box returns any results and hide/display divs accordingly	
	
	$scope.displaySearchResults = function(resultsCount) {
		var resultsdiv = document.getElementById('search_results');
		var noresultsdiv = document.getElementById('search_no_results');

		document.getElementById('search_again').style.display = 'block';
		document.getElementById('search_box').style.display = 'none';
		
		if (resultsCount == 0) {
	        resultsdiv.style.display = 'none';
	        noresultsdiv.style.display = 'block';	        
	    }
	    else {
	        resultsdiv.style.display = 'block';
	        noresultsdiv.style.display = 'none';
	        $scope.currentResult = 0;
	    	$scope.resultSize = 3;
	    	$scope.numberOfResultPages = function(){
	    		return Math.ceil(resultsCount/$scope.resultSize);
	    	};
	    }
	};

	$scope.toggleSearchDivs = function(){
		document.getElementById('search_results').style.display = 'none';
		document.getElementById('search_no_results').style.display = 'none';
		document.getElementById('search_again').style.display = 'none';
		document.getElementById('search_box').style.display = 'block';
	}

//Show/hide Edit/Cancel buttons; make template content (non)editable
//NOTE: all HTML ids must match db ids exactly; function('elementID', 'elementID', ...)
	
	$scope.toggleEdit = function() {
		var editButton = document.getElementById('edit');
		var cancelSaveButton = document.getElementById('cancel_save');
		if (editButton.style.display == 'block') {
			editButton.style.display = 'none';
			cancelSaveButton.style.display = 'block';
		}
		else {
			editButton.style.display = 'block';
			cancelSaveButton.style.display = 'none';
		}
		for (var i = 0; i < arguments.length; i++) {
			var fieldToToggle = document.getElementById(arguments[i]);
			if (fieldToToggle.contentEditable == 'true') {
				fieldToToggle.contentEditable = 'false'
			}
			else {
				fieldToToggle.contentEditable = 'true'
			}
		}

	};
	
//Save changes made to edited fields; push changes to CouchDB
//NOTE: all HTML ids must match db ids exactly; function(UUID, 'elementID', 'elementID', ...)	

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
