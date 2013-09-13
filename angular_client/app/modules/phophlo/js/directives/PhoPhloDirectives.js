console.log("Loading the PhoPhloDirectives.");

'use strict';
define(
  ["angular"],
  function(angular) {
    var PhoPhloDirectives = angular
      .module('PhoPhlo.directives', [])
      .directive("coordinatesClick", function(mouse) {

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

            // Apply the scope expression so the
            // handler is invoked and the digest()
            // method is invoked implicitly.
            scope.$apply(scopeExpression);
          });

        };

        // Return the linking function.
        return (linkFunction);
      });

    return PhoPhloDirectives;
  });