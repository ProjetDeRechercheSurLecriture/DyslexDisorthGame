console.log("Loading the SAILSController.");

'use strict';
define([ "angular" ], function(angular) {
  var SAILSController = function($scope, $resource, mouse) {
    if (!$scope.results) {
      $scope.results = [];
    }
    $scope.stimuli = [ "Loading" ];
    $scope.experiment = "sails";
    $scope.topImage = "gris.png";
    $scope.bottomImage = "pas_gris.png";
    $scope.practiceImage = "practice.png";
    $scope.reinforcement = "mouse_cheese.png";
    $scope.congratulations = "sails_congratulations.png";
    $scope.practiceNumber = 10;
    $scope.instructions = "sails_instructions.mp3";
    $scope.audio = [ "NI29A_Gris_MOD.mp3", "GR02A_Gris_MOD.mp3",
        "GR02A_Gris_MOD.mp3", "NI29A_Gris_MOD.mp3", "GR02A_Gris_MOD.mp3",
        "NI29A_Gris_MOD.mp3", "GR02A_Gris_MOD.mp3", "GR02A_Gris_MOD.mp3",
        "NI29A_Gris_MOD.mp3", "NI29A_Gris_MOD.mp3", "GR16B_Gris_MOD.mp3",
        "GR27C_Gris_MOD.mp3", "GR20B_Gris_MOD.mp3", "GR21A_Gris_MOD.mp3",
        "GR18A_Gris_MOD.mp3", "GR20C_Gris_MOD.mp3", "GR21C_Gris_MOD.mp3",
        "GR27A_Gris_MOD.mp3", "GR04A_Gris_MOD.mp3", "GR28A_Gris_MOD.mp3" ];

    $scope.congratulationsScreen = function() {
      window.location.assign("#/sails/congratulations");
    };
    
    $scope.saveScore = function(childInfo) {
      var experimentData = {};
      experimentData.experiment = $scope.experiment;
      experimentData.date = new Date();
      experimentData.child = childInfo;
      experimentData.results = $scope.results;
      console.log("Experiment Data: " + JSON.stringify(experimentData));
      window.alert("Score saved!");
      $scope.results = [];
      window.location.assign("#/sails");
    };

    $scope.noSave = function() {
      $scope.results = [];
      window.alert("Thanks for playing!");
      window.location.assign("#/sails");
    };

  };
  SAILSController.$inject = [ '$scope', '$resource', 'mouse' ];
  return SAILSController;
});