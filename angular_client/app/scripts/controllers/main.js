/* globals FieldDB */
'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:MainController
 * @description
 * # MainController
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp')
  .controller('MainController', function() {
    if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application) {
      FieldDB.FieldDBObject.application.brand = 'Example';
      FieldDB.FieldDBObject.application.website = 'http://get.example.ca';
    }
  });
