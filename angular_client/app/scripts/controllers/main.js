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
  .controller('MainController', function($scope, $location, $timeout) {

    // Listen for the event.
    document.addEventListener('authenticated', function() {

      var showStimuliEditingDashboard = false;
      var redirectToMostLikelyDashboard = '';

      if ($location.path().indexOf('welcome') > -1 ||
        $location.path().indexOf('bienvenu') > -1 ||
        window.location.pathname.indexOf('welcome') > -1 ||
        window.location.pathname.indexOf('bienvenu') > -1) {
        var mostRecentConnection = FieldDB.FieldDBObject.application.authentication.user.corpora._collection[0];
        redirectToMostLikelyDashboard = mostRecentConnection.owner + '/' + mostRecentConnection.titleAsUrl;
      }

      if (showStimuliEditingDashboard) {
        if (FieldDB.FieldDBObject.application.authentication.user.corpora.find('sails-fr-ca').length > 0) {
          redirectToMostLikelyDashboard = 'sails/fr-ca/datalists';
        }
      }

      if (redirectToMostLikelyDashboard) {
        $scope.$apply(function() {
          console.log('  Redirecting the user to the most likely dashboard they will want to see', redirectToMostLikelyDashboard);
          //http://joelsaupe.com/programming/angularjs-change-path-without-reloading/
          $location.path('/' + redirectToMostLikelyDashboard, false);
        });
      }


      //  user.corpora = user.corpora || [];
      // user.mostrecentdb = "/";
      // user.roles.map(function(role) {
      //   var dbname = role.substring(0, role.lastIndexOf("_"));
      //   if (role.indexOf("-") > -1 && role.indexOf("_reader") > -1 && user.corpora.indexOf(dbname) === -1 && dbname.indexOf("lingllama-communitycorpus") === -1 && dbname.indexOf("public-firstcorpus") === -1) {
      //     dbname = dbname.replace("-", "/");
      //     if (dbname.indexOf("public") === -1 && dbname.indexOf("lingllama") === -1) {
      //       user.corpora.push(dbname);
      //       user.mostrecentdb = dbname;
      //     }
      //   }
      //   return role;
      // });
      // try {
      //   // FieldDB.FieldDBObject.application.authentication.user = new FieldDB.User(user);
      // } catch (e) {
      //   console.log("problem parsing user", e, user);
      // }

      // $scope.team = user;
      // $rootScope.authenticated = true;
      // console.log($scope);


      $timeout(function() {
        if (!$scope.$$phase) {
          $scope.$digest(); //$digest or $apply
        }
      }, 500);
    }, false);

  });
