/* globals FieldDB */
'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:SignupController
 * @description
 * # SignupController
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp')
  .controller('SignupController', function($scope, $rootScope, $timeout, $location) {


    $timeout(function() {
      if (($location.path() === "/welcome" || $location.path() === "/bienvenu") &&
        FieldDB &&
        FieldDB.FieldDBObject &&
        FieldDB.FieldDBObject.application &&
        FieldDB.FieldDBObject.application.authentication &&
        FieldDB.FieldDBObject.application.authentication.user &&
        FieldDB.FieldDBObject.application.authentication.user.authenticated) {
        $scope.$apply(function() {
          console.log("  The user is loggged in. Redirecting the user to the base page");
          //http://joelsaupe.com/programming/angularjs-change-path-without-reloading/
          $location.path("/", false);
        });
      }
    }, 500);

    $scope.registerDetails = {
      firstname: '',
      lastname: ''
    };

    $scope.baseUsernameOnFirstAndALastName = function() {
      $scope.registerDetails.username = $scope.registerDetails.firstname + $scope.registerDetails.lastname;

      if (FieldDB && FieldDB.CorpusConnection) {
        $scope.registerDetails.username = FieldDB.CorpusConnection.validateIdentifier(
          $scope.registerDetails.username
        ).identifier;
      }
      $scope.userIsRegistering = true;
    };
    $scope.validateRegistrationDetails = function() {
      $scope.registerDetails.firstname = $scope.registerDetails.firstname || '';
      $scope.registerDetails.lastname = $scope.registerDetails.lastname || '';
      $scope.registerDetails.email = $scope.registerDetails.email || '';

      $scope.registerDetails.firstname = $scope.registerDetails.firstname.trim();
      $scope.registerDetails.lastname = $scope.registerDetails.lastname.trim();
      $scope.registerDetails.email = $scope.registerDetails.email.trim();

      if (!$scope.registerDetails.firstname || !$scope.registerDetails.lastname || !$scope.registerDetails.email) {
        return;
      }

      $rootScope.register($scope.registerDetails);
    };

  });
