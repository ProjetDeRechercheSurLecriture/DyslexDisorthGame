console.log("Loading the SAILSDirectives.");

'use strict';
define([ "angular" ], function(angular) {
	var SAILSDirectives = angular.module('SAILS.directives', []).directive(
			'moduleVersion', [ 'version', function(version) {
				return function(scope, elm, attrs) {
					elm.text(version);
				};
			} ]).directive(
			'stimuli2',
			function($compile) {
				return function(scope, element, attrs) {
					var i = 0;
					var j = 1;
					scope.$watch('stimuli', function() {
						if (scope.stimuli != undefined) {
							element.html("<div class='span4'><img src='image_stimuli/" + scope.topImage + "'><br /><img src='image_stimuli/pas_" + scope.topImage + "'></div><div class='span6'><img src='image_stimuli/"
									+ scope.practiceImage + "'></img></div><audio src='audio_stimuli/" + scope.instructions + "' autoplay></audio>");
							$compile(element.contents())(scope);
							element.click(function() {
								if (i < scope.practiceNumber) {
									element.html("<div class='span4'><img src='image_stimuli/" + scope.topImage + "'><br /><img src='image_stimuli/" + scope.bottomImage + "'></div><div class='span6'><img src='image_stimuli/"
											+ scope.practiceImage + "'></img></div><audio src='audio_stimuli/" + scope.audio[i] + "' autoplay></audio>");
									$compile(element.contents())(scope);
									i++;
								} else if (i < scope.audio.length) {
									if (i == scope.practiceNumber) {
										window.alert("Ready to start?");
									}
									if (j < 10) {
										j = "0" + j;
									};
									element.html("<div class='span4'><img src='image_stimuli/" + scope.topImage + "'><br /><img src='image_stimuli/" + scope.bottomImage + "'></div><div class='span6'><img src='image_stimuli/r" + j + "_" + scope.reinforcement + "'></img></div><audio src='audio_stimuli/" + scope.audio[i] + "' autoplay></audio>");
									$compile(element.contents())(scope);
									i++;
									j++;
								} else if (i == scope.audio.length) {
									element.html("<div class='span4'><img src='image_stimuli/" + scope.topImage + "'><br /><img src='image_stimuli/" + scope.bottomImage + "'></div><div class='span6'><img src='image_stimuli/" + scope.congratulations + "'></img></div>");
									$compile(element.contents())(scope);
								}
							});

						}
					});
				};
			});
	return SAILSDirectives;
});