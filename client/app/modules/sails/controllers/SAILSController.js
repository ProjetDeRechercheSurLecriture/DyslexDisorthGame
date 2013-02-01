console.log("Loading the SAILSController.")

'use strict';
define([ "angular" ], function(angular) {
  var SAILSController = function($scope, $resource, mouse) {
    $scope.stimuli = [ "Loading" ];
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

  };
  SAILSController.$inject = [ '$scope', '$resource', 'mouse' ];
  return SAILSController;
});