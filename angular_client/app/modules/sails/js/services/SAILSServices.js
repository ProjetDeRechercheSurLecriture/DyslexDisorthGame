console.log("Loading the SAILSServices.");

define(["angular"], function(angular) {

  'use strict';

  var SAILSServices = angular.module('SAILS.services', ['ngResource']).factory(
    'SAILS_data',
    function($http) {
      return {
        'blankSAILSTemplate': function() {
          var promise = $http.get('sails_design.json').then(
            function(response) {
              return response.data;
            });
          return promise;
        }
      };
    }).factory('audio', function($document) {
    var audioElement = $document[0].createElement('audio');
    return {
      audioElement: audioElement,

      play: function(filename) {
        audioElement.src = filename;
        audioElement.play();
      }
    }
  });

  return SAILSServices;
});