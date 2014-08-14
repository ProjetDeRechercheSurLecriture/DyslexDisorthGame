'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:MainController
 * @description
 * # MainController
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp')
  .controller('MainController', function($scope) {
    $scope.connection = $scope.connection;
    $scope.connection.brand = 'Phophlo';
    $scope.connection.website = 'http://get.phophlo.ca';
  });
