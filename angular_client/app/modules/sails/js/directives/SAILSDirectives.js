console.log("Loading the SAILSDirectives.");

define(
  ["angular"],
  function(angular) {

    'use strict';

    var SAILSDirectives = angular
      .module('SAILS.directives', [])
      .directive('moduleVersion', ['version',
        function(version) {
          return function(scope, element, attrs) {
            element.text(version);
          };
        }
      ]);

    return SAILSDirectives;
  });