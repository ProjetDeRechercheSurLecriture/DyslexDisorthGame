console.log("Loading the PhoPhloDirectives.");

'use strict';
define([ "angular" ], function(angular) {
	var PhoPhloDirectives = angular.module('PhoPhlo.directives', []).directive(
			'moduleVersion', [ 'version', function(version) {
				return function(scope, elm, attrs) {
					elm.text(version);
				};
			} ]);
	return PhoPhloDirectives;
});