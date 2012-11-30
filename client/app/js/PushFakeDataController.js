'use strict';
//NOTE: Make sure that temp.json is in the /data directory before running!
function PushFakeDataController($scope, $resource, LocalFakeData, CouchFakeData) {
	$scope.saveFakeData = function(fake) {
//Change status to 'enabled' to enable this function, 'disabled' to disable it		
		var status = 'disabled';
		if (status == 'disabled') {
			window.alert("This feature is currently disabled. To enable, see PushFakeDataController.js.");
		}
		else {
			//Limit number of new records to 25
			if (fake.number > 25) {
				window.alert("You can create a maximum of 25 fake records at a time.");
				return;
			} 
			//Confirm, then load old record (json with one record template) and replace fields with data
			//from fakedata.html, write to remote CouchDB in PushFakeDataServices (CouchFakeData)
			else {
				var r = confirm("Are you sure you want to create " + fake.number + " fake records?");
				if (r == true) {
					var oldRecord = LocalFakeData.query(function() {
						var newRecord = oldRecord;
						newRecord.inspection_stage = fake.inspection_stage;
						newRecord.purchaseOrder.id = fake.po;
						newRecord.sku.number = fake.sku.number;
						newRecord.sku.name = fake.sku.name;
						console.log("Attempting to create new records.");
						for ( var i = 1; i <= fake.number; i++) {
							var fakeRecord = CouchFakeData.save(newRecord, function() {
					          console.log(i-1 + " fake records created.");
							});
						};
					});
				};
			};
		};
	};
};