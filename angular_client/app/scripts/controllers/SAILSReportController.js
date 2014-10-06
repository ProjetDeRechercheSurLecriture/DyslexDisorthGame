/* globals FieldDB */
'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:SAILSReportController
 * @description
 * # SAILSReportController
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp')
  .controller('SAILSReportController', function($scope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $timeout(function() {
      if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application && FieldDB.FieldDBObject.application.corpus) {
        FieldDB.FieldDBObject.application.corpus.fetchCollection('experiments', null, null, null, null, 'sails').then(function(results) {
          $scope.results = results;
          if (!$scope.$$phase) {
            $scope.$digest(); //$digest or $apply
          }
        });
      }
    }, 1000);
  });
