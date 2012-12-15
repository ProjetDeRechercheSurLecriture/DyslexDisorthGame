'use strict';
// NOTE: Make sure that temp.json is in the /data directory before running!
function PushFakeDataController($scope, $resource, LocalFakeData, CouchFakeData) {
	$scope.saveFakeData = function(fake) {
		// Change status to 'enabled' to enable this function, 'disabled' to
		// disable it
		var status = 'enabled';
		if (status == 'disabled') {
			window
					.alert("This feature is currently disabled. To enable, see PushFakeDataController.js.");
		} else {
			// Limit number of new records to 25
			if (fake.number > 25) {
				window
						.alert("You can create a maximum of 25 fake records at a time.");
				return;
			}
			// Confirm, then load old record (json with one record template) and
			// replace fields with data
			// from fakedata.html, write to remote CouchDB in
			// PushFakeDataServices (CouchFakeData)
			else {
				var r = confirm("Are you sure you want to create "
						+ fake.number + " fake records?");
				if (r == true) {
					var oldRecord = LocalFakeData.query(function() {
						var newRecord = oldRecord;
						/*Supplier and Buyer are static. Add code if more options are desired*/

						newRecord.header.date = fake.date;
						newRecord.header.forecasted_inspection_date = fake.forecasted_inspection_date;
						newRecord.header.productionStage = fake.inspection_stage;
						newRecord.header.location = fake.location;
						newRecord.header.sku._id = fake.sku.number;
						
						//Assign product name based on sku.number
						var productName;
						if (fake.sku.number == "345678") {
							productName = "Chocolate Chip Cookies";
						}
						else if (fake.sku.number == "987234") {
							productName = "Butter Pecan Cookies";
						}
						else if (fake.sku.number == "789234") {
							productName = "Oatmeal Raisin Cookies";
						} 
						else if (fake.sku.number == "907234") {
							productName = "Peanut Butter Cookies";
						} 
						else {
							productName = "Coconut Cookies";
						}
						newRecord.header.sku.name = productName;
						
						newRecord.header.purchaseOrder._id = fake.purchaseOrder.number;
						
						// Generate Work Order id
						var workOrderDate = new Date(fake.date);
						var workOrderDay = workOrderDate.getDate() + 1;
						var workOrderMonth = workOrderDate.getMonth() + 1;
						var workOrderNumber;
						if (fake.inspection_stage == "IPC"
								|| fake.inspection_stage == "DPI") {
							workOrderNumber = fake.inspection_stage + "-"
									+ JSON.stringify(workOrderMonth)
									+ JSON.stringify(workOrderDay) + "-"
									+ fake.sku.number;
						} else {
							workOrderNumber = fake.inspection_stage + "-"
									+ JSON.stringify(workOrderMonth)
									+ JSON.stringify(workOrderDay) + "-"
									+ fake.purchaseOrder.number;
						}
						$scope.fakeWordOrderNumber = workOrderNumber;
						newRecord.header.workOrder._id = workOrderNumber;
						
						newRecord.header.assignment._id = fake.assignment.number;
						newRecord.header.assignment.date_created = fake.assignment.date;
						newRecord.flagged = fake.flagged;
						newRecord.urgent = fake.urgent;
						newRecord.conclusion.result = fake.conclusion.result;
						
						console.log("Attempting to create new records.");


						for ( var i = 1; i <= fake.number; i++) {
							var fakeRecord = CouchFakeData.save(newRecord,
									function() {
										console.log(i - 1
												+ " fake records created.");
									});
						}
						;
					});
				}
				;
			}
			;
		}
		;
	};
};