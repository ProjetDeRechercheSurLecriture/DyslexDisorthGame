console.log("Loading the SAILSController.");

define(["angular"], function(angular) {

  'use strict';

  var SAILSController = function($scope, $resource, $timeout, SAILS_data, audio) {
    // Controller code

    $scope.practiceAudioIndex = 0;
    $scope.experimentAudioIndex = 0;
    $scope.participantID = null;

    $scope.startSAILS = function() {
      // Test to see if participant info has been selected by experimenter;
      // if not, start new experiment; if so, append new instance to participant record
      if ($scope.participantID === null) {
        $scope.trialIndex = 0;
        SAILS_data.blankSAILSTemplate().then(function(SAILStemplate) {
          $scope.test = SAILStemplate;
          $scope.sailsAudio = "audio_stimuli/sails_instructions.mp3";
          audio.play($scope.sailsAudio);
          $scope.practiceAudioFiles = SAILStemplate.subexperiments[$scope.trialIndex].practice.trials;
          $scope.experimentAudioFiles = SAILStemplate.subexperiments[$scope.trialIndex].test.trials;
          window.location.assign('#/sails/experiment');
        });
      } else {
        // Append to existing participant record
        console.log("Participant already has a SAILS record.");
      }
    };

    $scope.registerResponse = function(event, response) {
      if (response == $scope.currentResponse) {
        console.log("Right!");
      } else {
        console.log("Sorry.");
      }

      console.log("coords inside of image: " + event.offsetX + ", " + event.offsetY);
      $scope.playNextAudio();
    };

    $scope.playNextAudio = function() {
      if ($scope.practiceAudioIndex < $scope.practiceAudioFiles.length) {
        $scope.sailsAudio = "audio_stimuli/" + $scope.practiceAudioFiles[$scope.practiceAudioIndex].audioFile + ".mp3";
        $scope.currentResponse = $scope.practiceAudioFiles[$scope.practiceAudioIndex].response;
        // Wait a bit until next audio is played
        $timeout(function() {
          audio.play($scope.sailsAudio);
        }, 1000);
        $scope.practiceAudioIndex++;
      } else if ($scope.experimentAudioIndex < $scope.experimentAudioFiles.length) {
        $scope.sailsAudio = "audio_stimuli/" + $scope.experimentAudioFiles[$scope.experimentAudioIndex].audioFile + ".mp3";
        $scope.currentResponse = $scope.experimentAudioFiles[$scope.experimentAudioIndex].response;
        // Wait a bit until next audio is played
        $timeout(function() {
          audio.play($scope.sailsAudio);
        }, 1000);
        $scope.experimentAudioIndex++;
      } else {
        // Take participant to results screen (current code is for dev)
        window.alert("You\'re done!");
        $scope.practiceAudioIndex = 0;
        $scope.experimentAudioIndex = 0;
        window.location.assign('#/sails');
      }
    };

    window.onbeforeunload = function(event) {
      console.log(window.location.href);
      if (window.location.href.indexOf('sails/experiment') > -1) {
        return "Reloading will stop this instance. You will have to reload and start over."
      } else {
        return;
      }
    };

  };
  SAILSController.$inject = ['$scope', '$resource', '$timeout', 'SAILS_data', 'audio'];
  return SAILSController;
});