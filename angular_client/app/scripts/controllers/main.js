'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
