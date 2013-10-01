console.log("Loading the SAILSController.");

define(["angular"], function(angular) {

  'use strict';

  var SAILSController = function($scope, $resource, $timeout, SAILS_data, audio) {
    // Controller code

    $scope.practiceAudioIndex = 0;
    $scope.practiceInProgress = true;
    $scope.experimentAudioIndex = 0;
    $scope.imageIndex = 1;
    $scope.participantID = null;

    $scope.startSAILS = function() {
      // Test to see if participant info has been selected by experimenter;
      // if not, start new experiment; if so, append new instance to participant record
      $scope.trialIndex = 0;
      SAILS_data.blankSAILSTemplate().then(function(SAILStemplate) {
        $scope.test = SAILStemplate;
        $scope.sailsAudio = "audio_stimuli/sails_instructions.mp3";
        audio.play($scope.sailsAudio);
        $scope.practiceAudioFiles = SAILStemplate.subexperiments[$scope.trialIndex].practice.trials;
        $scope.experimentAudioFiles = SAILStemplate.subexperiments[$scope.trialIndex].test.trials;
        window.location.assign('#/sails/experiment');
      });
    };

    $scope.updateReinforcementImage = function(imageIndex) {
      if (imageIndex < 10) {
        $scope.reinforcementImageIndex = "0" + imageIndex;
      } else {
        $scope.reinforcementImageIndex = imageIndex;
      }
    };

    // Set up first reinforcement image
    $scope.updateReinforcementImage($scope.imageIndex);

    $scope.registerResponseAndGoToNext = function(event, response) {
      // Stop playing instructions and start experiment if clicking from instructions
      if (!response) {
        audio.stopPlaying();
        $scope.experimentInProgress = true;
      }

      // Do nothing until current practice or experiment audio has finished playing
      if ($scope.clickDisabled === true || audio.isPlaying()) {
        window.alert("Ralentis, mon chou!");
        return;
      }

      // Register responses to previously played audio
      if (response) {
        // Calculate touch response percentage from center of clickable image
        var centerX = event.srcElement.width / 2;
        var centerY = event.srcElement.height / 2;
        var clickOffsetFromCenterX = ((event.srcElement.width / 2) - event.offsetX);
        clickOffsetFromCenterX = clickOffsetFromCenterX < 0 ? (clickOffsetFromCenterX * -1) : clickOffsetFromCenterX;
        var clickOffsetFromCenterY = ((event.srcElement.height / 2) - event.offsetY);
        clickOffsetFromCenterY = clickOffsetFromCenterY < 0 ? (clickOffsetFromCenterY * -1) : clickOffsetFromCenterY;
        var clickPercentFromCenterX = Math.round(((clickOffsetFromCenterX / centerX) * 100));
        var clickPercentFromCenterY = Math.round(((clickOffsetFromCenterY / centerY) * 100));

        if ($scope.practiceInProgress === true) {
          // Register practice responses
          $scope.test.subexperiments[0].practice.trials[$scope.practiceAudioIndex - 1].participantResponse = {};
          $scope.test.subexperiments[0].practice.trials[$scope.practiceAudioIndex - 1].participantResponse.response = response;
          $scope.test.subexperiments[0].practice.trials[$scope.practiceAudioIndex - 1].participantResponse.clickPercentFromCenterX = clickPercentFromCenterX;
          $scope.test.subexperiments[0].practice.trials[$scope.practiceAudioIndex - 1].participantResponse.clickPercentFromCenterY = clickPercentFromCenterY;
        } else {
          // Register experiment responses
          $scope.test.subexperiments[0].test.trials[$scope.experimentAudioIndex - 1].participantResponse = {};
          $scope.test.subexperiments[0].test.trials[$scope.experimentAudioIndex - 1].participantResponse.response = response;
          $scope.test.subexperiments[0].test.trials[$scope.experimentAudioIndex - 1].participantResponse.clickPercentFromCenterX = clickPercentFromCenterX;
          $scope.test.subexperiments[0].test.trials[$scope.experimentAudioIndex - 1].participantResponse.clickPercentFromCenterY = clickPercentFromCenterY;
        }
      }
      $scope.goToNext();
    };

    $scope.goToNext = function(event, response) {

      //Disable clicking during audio play timeout
      $scope.clickDisabled = true;

      // Update image index
      // Begin animation only after first click on first experiment data
      // Don't go past last image
      if ($scope.experimentAudioIndex > 0 && $scope.imageIndex < 11) {
        $scope.imageIndex++;
        $scope.updateReinforcementImage($scope.imageIndex);
      }

      if ($scope.practiceAudioIndex < $scope.practiceAudioFiles.length) {
        // Play practice audio
        $scope.sailsAudio = "audio_stimuli/" + $scope.practiceAudioFiles[$scope.practiceAudioIndex].audioFile + ".mp3";

        // Wait a bit until next audio is played
        $timeout(function() {
          audio.play($scope.sailsAudio);
          $scope.clickDisabled = false;
          $scope.practiceAudioIndex++;
        }, 500);
      } else if ($scope.experimentAudioIndex < $scope.experimentAudioFiles.length) {
        // Play experiment audio
        $scope.practiceInProgress = false;
        $scope.sailsAudio = "audio_stimuli/" + $scope.experimentAudioFiles[$scope.experimentAudioIndex].audioFile + ".mp3";

        // Wait a bit until next audio is played
        $timeout(function() {
          audio.play($scope.sailsAudio);
          $scope.clickDisabled = false;
          $scope.experimentAudioIndex++;
        }, 500);

      } else {
        // Take participant to results screen
        console.log(JSON.stringify($scope.test));
        $scope.practiceAudioIndex = 0;
        $scope.experimentAudioIndex = 0;
        $scope.clickDisabled = false;
        window.location.assign('#/sails/congratulations');

        // TODO Test for participant ID; if none, create new record; if participant ID exists,
        // append results from $scope.test to existing record
      }
    };

    window.onbeforeunload = function(event) {
      if (window.location.href.indexOf('sails/experiment') > -1) {
        return "Reloading will stop this instance. You will have to reload and start over.";
      } else {
        return;
      }
    };

  };
  SAILSController.$inject = ['$scope', '$resource', '$timeout', 'SAILS_data', 'audio'];
  return SAILSController;
});