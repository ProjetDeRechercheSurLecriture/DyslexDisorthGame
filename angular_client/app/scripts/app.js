'use strict';
/* globals FieldDB */

/**
 * @ngdoc overview
 * @name adminDashboardApp
 * @description
 * # adminDashboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('adminDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'fielddbAngularApp',
    'nvd3'
  ])
  .config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
    // $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist(FieldDB.FieldDBObject.application.resourceUrlWhitelist);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/welcome', {
        redirectTo: '/bienvenu'
      })
      .when('/bienvenu', {
        templateUrl: 'views/signup.html'
      })
      .when('/:team/:corpusidentifier/nouveau/classe', {
        redirectTo: '/:team/:corpusidentifier/import/participants'
      })
      .when('/:team/:corpusidentifier/rapports/classe', {
        redirectTo: '/:team/:corpusidentifier/reports/participants'
      })
      .when('/:team/:corpusidentifier/gerer/test-block', {
        redirectTo: '/:team/:corpusidentifier/datalists'
      })
      .when('/:team/:corpusidentifier/gerer/stimuli', {
        redirectTo: '/:team/:corpusidentifier/data'
      })
      .when('/:team/:corpusidentifier/rapports/ecoute', {
        templateUrl: 'views/sails_report.html',
        controller: 'FieldDBController'
      });

    if (FieldDB && FieldDB.Router) {
      for (var when in FieldDB.Router.routes) {
        FieldDB.Router.routes[when].angularRoute.controller = 'FieldDBController';
        $routeProvider.when(FieldDB.Router.routes[when].path, FieldDB.Router.routes[when].angularRoute);
      }
      if (FieldDB.Router.otherwise) {
        $routeProvider.otherwise(FieldDB.Router.otherwise);
      }
    }

  });

console.log(app);

// app.run(['$route', '$rootScope', '$location',
//   function($route, $rootScope, $location) {
//     var original = $location.path;
//     $location.path = function(path, reload) {
//       if (reload === false) {
//         var lastRoute = $route.current;
//         var un = $rootScope.$on('$locationChangeSuccess', function() {
//           $route.current = lastRoute;
//           un();
//         });
//       }
//       return original.apply($location, [path]);
//     };
//   }
// ]);
