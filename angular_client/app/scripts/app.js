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
    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer domain.
      'https://*.lingsync.org/**',
      'http://*.phophlo.ca/**',
      'https://*.phophlo.ca/**'
    ]);

    //Dont show alerts when in this app, until we have error modals or something
    FieldDB.FieldDBObject.bug = FieldDB.FieldDBObject.prototype.todo;

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
      })
      .when('/:team/:corpusid/rapports/ecoute', {
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


    FieldDB.FieldDBObject.application.participantsList.title.default = 'Élèves';
    FieldDB.FieldDBObject.application.participantsList.description.default = 'Voici tous les élèves de votre base de données. Pour importer d\'advantage d\'étudants, utiliser les menus Nouveau > Classe';

    // FieldDB.FieldDBObject.application.contextualizer.addUrls(['en/messages.json','fr/messages.json']).then(function(){
    //   console.log('Added urls');
    // });

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
