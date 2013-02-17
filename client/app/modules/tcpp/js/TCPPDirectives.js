console.log("Loading the TCPPDirectives.");

'use strict';
define([ "angular" ], function() {

  var TCPPDirectives = angular.module('TCPP.directives', []);
  console.log("There is nothing special in the "
      + "TCPP directives, using the standard Experiment directives");
  return TCPPDirectives;
});
