console.log("Loading the PhoPhloServices.");

'use strict';
define([ "angular" ], function(angular) {
  var PhoPhloServices = angular.module('PhoPhlo.services', [ 'ngResource' ])
  // mouse factory adapted from
  // http://http://www.bennadel.com/blog/2423-Exposing-A-Mouse-Service-For-Click-Events-In-AngularJS.htm
  .factory("mouse", function() {

    // Define the initial position. This will be a hash
    // with X / Y properties.
    var location = null;

    // Let's keep track of the previous location, if it
    // is going to be intertesting at all.
    var previousLocation = null;

    // Define the public API for this service.
    var api = {

      // Get the current location, if there is one.
      getLocation : function() {

        // Return a copy of the location so that we
        // don't accidentally break encapsulation.
        return (angular.copy(location));
      },

      // Set the new location.
      setLocation : function(x, y) {

        // If we have a current location, let's copy
        // it into the previous location.
        if (location) {
          previousLocation = location;
        }

        // Overwrite with the new location.
        location = {
          x : x,
          y : y
        };
      }
    };

    // Return the API as our factory definition.
    return (api);
  });
  return PhoPhloServices;
});