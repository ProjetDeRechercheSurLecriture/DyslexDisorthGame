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
      FieldDB.FieldDBObject.application.brand = 'DyslexDisorth';
      FieldDB.FieldDBObject.application.brandLowerCase = 'dyslexdisorth';
      FieldDB.FieldDBObject.application.website = 'http://get.dyslexdisorth.ca';
      FieldDB.FieldDBObject.application.tagline = 'Prédiction des Habiletés Orthographiques  Par des Habiletés Langage Oral';
    }
  });
