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
    FieldDB.FieldDBObject.application.brand = 'Example';
    FieldDB.FieldDBObject.application.website = 'http://get.example.ca';
  });
