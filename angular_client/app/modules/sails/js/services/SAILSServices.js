console.log("Loading the SAILSServices.");

define(["angular"], function(angular) {

  'use strict';

  var SAILSServices = angular.module('SAILS.services', ['ngResource']);
  return SAILSServices;
});