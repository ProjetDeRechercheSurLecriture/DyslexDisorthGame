console.log("Loading the SAILSDirectives.");

'use strict';
define([ "angular" ], function(angular) {
  var SAILSDirectives = angular.module('SAILS.directives', []).directive(
      'moduleVersion', [ 'version', function(version) {
        return function(scope, element, attrs) {
          element.text(version);
        };
      } ]).directive(
      'stimuli2',
      function($compile) {
        return function(scope, element, attrs) {
          var i = 0;
          var j = 1;
          scope.$watch('stimuli', function() {
            if (scope.stimuli != undefined) {
              element.html("<div class='span4'><img id='"+ scope.topImage + "' src='image_stimuli/"
                  + scope.topImage + "' coordinates-click><br /><img id='"+ scope.bottomImage + "' src='image_stimuli/"
                  + scope.bottomImage
                  + "' coordinates-click></div><div class='span6'><img id='"+ scope.practiceImage + "' src='image_stimuli/"
                  + scope.practiceImage
                  + "' coordinates-click></img></div><audio src='audio_stimuli/"
                  + scope.instructions + "' autoplay></audio>");
              $compile(element.contents())(scope);
              element.click(function() {
                console.log("audio: " + scope.audio[i]);
                if (i < scope.practiceNumber) {
                  element.html("<div class='span4'><img id='"+ scope.topImage + "' src='image_stimuli/"
                      + scope.topImage + "' coordinates-click><br /><img id='"+ scope.bottomImage + "' src='image_stimuli/"
                      + scope.bottomImage
                      + "' coordinates-click></div><div class='span6'><img id='"+ scope.practiceImage + "' src='image_stimuli/"
                      + scope.practiceImage
                      + "' coordinates-click></img></div><audio src='audio_stimuli/"
                      + scope.audio[i] + "' autoplay></audio>");
                  $compile(element.contents())(scope);
                  i++;
                } else if (i < scope.audio.length) {
                  if (i == scope.practiceNumber) {
                    window.alert("Ready to start?");
                  }
                  if (j < 10) {
                    j = "0" + j;
                  }
                  ;
                  element.html("<div class='span4'><img id='"+ scope.topImage + "' src='image_stimuli/"
                      + scope.topImage + "' coordinates-click><br /><img id='"+ scope.bottomImage + "' src='image_stimuli/"
                      + scope.bottomImage
                      + "' coordinates-click></div><div class='span6'><img id='"+ scope.reinforcement + "' src='image_stimuli/r"
                      + j + "_" + scope.reinforcement
                      + "' coordinates-click></img></div><audio src='audio_stimuli/"
                      + scope.audio[i] + "' autoplay></audio>");
                  $compile(element.contents())(scope);
                  i++;
                  j++;
                } else if (i == scope.audio.length) {
                  element.html("<div class='span4'><img id='"+ scope.topImage + "' src='image_stimuli/"
                      + scope.topImage + "'><br /><img id='"+ scope.bottomImage + "' src='image_stimuli/"
                      + scope.bottomImage
                      + "'></div><div class='span6'><img id='"+ scope.congratulations + "' src='image_stimuli/"
                      + scope.congratulations + "'></img></div>");
                  $compile(element.contents())(scope);
                }
              });

            }
          });
        };
      }).directive("coordinatesClick", function(mouse) {

    // Connect the Angular context to the DOM events.
    var linkFunction = function(scope, element, attrs) {

      // Get the expression we want to evaluate on the
      // scope when the document is clicked.
      var scopeExpression = attrs.coordinatesClick;

      // Bind to the element click event.
      element.on("click", function(event) {

        // Set the click coordinates in the mouse
        // service.
        mouse.setLocation(event.pageX, event.pageY);
        var imageX = event.pageX - element[0].offsetLeft;
        var imageY = event.pageY - element[0].offsetTop;
        console.log("Results: " + "\npageX: " + event.pageX + "\npageY: " + event.pageY + "\nimageX: " + imageX + "\nimageY: " + imageY + "\nimage clicked: " + element[0].id);
        
        // Apply the scope expression so the
        // handler is invoked and the digest()
        // method is invoked implicitly.
        scope.$apply(scopeExpression);
      });

    };

    // Return the linking function.
    return (linkFunction);
  });

  return SAILSDirectives;
});