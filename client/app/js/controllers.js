'use strict';

/* Controllers */

function MainCtrl($scope, $resource, Child, Session, GetNewUUID, AccessCouch) {

//Query data; assign to template scope; initialize default values
	
	$scope.sessions = Session.query();  
	$scope.childs = Child.query();
	$scope.orderProp = 'participantID';
	$scope.searching = 'true';
	$scope.editing = 'false';

	
	
	$scope.load = function() {
		window.alert("Done!");
	}
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
