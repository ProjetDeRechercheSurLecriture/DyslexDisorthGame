console.log("Loading the SAILSServices.");

'use strict';
define([ "angular" ], function(angular) {
  var SAILSServices = angular.module('SAILS.services', [ 'ngResource' ]);
  return SAILSServices;
});