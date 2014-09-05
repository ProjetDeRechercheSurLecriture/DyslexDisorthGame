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
angular
  .module('adminDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'fielddbAngularApp'
  ])
  .config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer domain.
      'https://*.lingsync.org/**',
      'https://*.phophlo.ca/**'
    ]);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/about/contact', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/welcome', {
        redirectTo: '/bienvenu'
      })
      .when('/bienvenu', {
        templateUrl: 'views/signup.html',
        controller: 'AboutCtrl'
      })
      .when('/:team/:corpusid/nouveau/classe', {
        redirectTo: '/:team/:corpusid/import/participants'
      })
      .when('/:team/:corpusid/rapports/classe', {
        redirectTo: '/:team/:corpusid/reports/participants'
      })
      .when('/:team/:corpusid/gerer/test-block', {
        redirectTo: '/:team/:corpusid/datalists'
      })
      .when('/:team/:corpusid/gerer/stimuli', {
        redirectTo: '/:team/:corpusid/data'
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
