'use strict';

/* Controllers */

function MainCtrl($rootScope, $scope, $resource, Participants, Sessions,
    AccessCouch) {

  // Add authentication here

  // Query data; assign to template scope; initialize default values

  $scope.sessions = Sessions.query();
  $scope.childs = Participants.query();

  // Variables for ng-show directives
  $rootScope.testing = 'false';
  $scope.searching = 'true';
  $scope.editing = 'false';
  $scope.showAddlReports = 'false';

  $scope.headphonesAlert = function() {
    window.alert("Please plug in headphones to continue.");
  };

  // Test to see if text in search box returns any results and hide/display divs
  // accordingly

  $scope.displaySearchResults = function(resultsCount) {
    if (resultsCount == 0) {
      $scope.searching = 'true';
      window.alert('No matching results.');
    } else {
      $scope.searching = 'false';
      $scope.orderProp = 'lastName';
      $scope.currentResult = 0;
      $scope.resultSize = 5;
      $scope.numberOfResultPages = function() {
        return Math.ceil(resultsCount / $scope.resultSize);
      };
    }
  };

  // Hide Edit/Show cancel/save buttons; make template content editable via
  // ng-show

  $scope.edit = function() {
    $scope.editing = 'true';
  }

  /* TRY TO FIND ANOTHER WAY TO REFRESH THE VIEW */
  $scope.cancel = function() {
    window.location.reload();
  }

  // Save changes made to edited fields; push changes to CouchDB

  $scope.saveRecord = function(records) {
    var newRecord = records;
    var currentUUID = records._id;
    var updatedRecord = AccessCouch.query({
      UUID : currentUUID
    }, function() {
      for (key in newRecord) {
        updatedRecord[key] = newRecord[key];
      }
      updatedRecord.$update({
        UUID : currentUUID
      });
    });
    $scope.editing = 'false';
  };

};

function SessionReportCtrl($scope, $routeParams) {

  // Set template filter value to value of sessionID in routeParams

  $scope.filterProp = $routeParams.sessionID;

};

function ParticipantReportCtrl($scope, $routeParams) {

  // Set template filter value to value of participantID in routeParams

  $scope.filterProp = $routeParams.participantID;

  $scope.loadReport = function(pathParams, participantID) {
    window.location = '#/reports/' + pathParams + '/' + participantID;
  }

};

function SAILSCtrl($rootScope, $scope, $routeParams) {
  var sailsAudio = [ "GR02A_Gris_MOD.mp3", "GR19A_Gris_MOD.mp3",
      "GR27D_Gris_MOD.mp3", "GR04A_Gris_MOD.mp3", "GR20A_Gris_MOD.mp3",
      "GR28A_Gris_MOD.mp3", "GR05A_Gris_MOD.mp3", "GR20B_Gris_MOD.mp3",
      "NI29A_Gris_MOD.mp3", "GR06A_Gris_MOD.mp3", "GR20C_Gris_MOD.mp3",
      "NI29B_Gris_MOD.mp3", "GR10B_Gris_MOD.mp3", "GR21A_Gris_MOD.mp3",
      "NI30A_Gris_MOD.mp3", "GR12A_Gris_MOD.mp3", "GR21B_Gris_MOD.mp3",
      "NI32A_Gris_MOD.mp3", "GR16B_Gris_MOD.mp3", "GR21C_Gris_MOD.mp3",
      "NI33A_Gris_MOD.mp3", "GR17A_Gris_MOD.mp3", "GR27A_Gris_MOD.mp3",
      "GR18A_Gris_MOD.mp3", "GR27C_Gris_MOD.mp3" ];

  $rootScope.testing = 'true';
  $scope.experimentType = "sails";
  $scope.currentStimulus = 0;

  $scope.confirmChoice = function() {
    var r = confirm("Are you sure?");
    if (r == true) {
      $scope.nextStimulus();
    } else {
      // do nothing
    }
  };
  $scope.nextStimulus = function() {
    document.getElementById("audio_instructions_player_source").pause();
    $scope.audioStimulus = "audio_stimuli/" + $scope.experimentType + "/"
        + sailsAudio[$scope.currentStimulus];
    document.getElementById("audio_stimuli_player_source").addEventListener(
        'canplaythrough', function() {
          document.getElementById("audio_stimuli_player_source").play()
        });

    $scope.currentStimulus++;
    var imagenumber = $scope.currentStimulus;
    if (imagenumber < 10) {
      imagenumber = "0" + imagenumber;
    }
    imagenumber = "/r" + imagenumber + "_mouse_cheese.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"
        + $scope.experimentType + imagenumber;

    if ($scope.currentStimulus >= sailsAudio.length) {
      window.alert("Good Job!");
      window.location.replace("#/test/sails/congratulations");
    }

  };

  $scope.noSave = function() {
    window.location.replace('#/test');
  };

};

function TCPPCtrl($rootScope, $scope, $routeParams) {
  var tcppAudio = [ "1.mp3", "1.mp3", "1.mp3", "2.mp3", "2.mp3", "3.mp3",
      "3.mp3", "3.mp3", "4.mp3", "4.mp3", "4.mp3", "4.mp3", "5.mp3", "5.mp3",
      "5.mp3", "5.mp3" ];

  $scope.audioStimulus = "audio_stimuli/tcpp/" + tcppAudio[0];

  var tcppStimuli = [ "01_feu.png", "02_chat.png", "03_but.png", "04_scie.png",
      "05_jus.png", "06_lit.png", "07_dent.png", "08_pain.png", "09_bas.png",
      "10_cou.png", "11_gants.png", "12_nid.png", "13_mouche.png",
      "14_canne.png", "15_balle.png", "16_tuque.png", "17_poire.png",
      "18_niche.png", "19_auto.png", "20_singe.png", "21_vent.png",
      "22_fee.png", "23_main.png", "24_salade.png", "25_joue.png",
      "02_chat.png", "26_nez.png", "27_banc.png", "28_the.png", "29_bain.png",
      "30_sou.png", "31_riz.png", "32_colle.png", "33_lac.png",
      "34_bouche.png", "35_suce.png", "36_tente.png", "37_jupe.png",
      "38_bol.png", "39_neige.png", "40_bac.png", "41_sol.png", "42_loupe.png",
      "43_pomne.png", "44_quille.png", "45_soupe.png", "46_tasse.png",
      "47_vol.png", "48_cheveux.png", "49_jambon.png", "50_cafe.png",
      "51_panda.png", "52_sofa.png", "53_chapeau.png", "54_ballon.png",
      "55_lapin.png", "56_tapis.png", "57_fusee.png", "58_lama.png",
      "59_patin.png", "60_maison.png", "61_soulier.png", "62_pizza.png",
      "63_bateau.png" ];

  $rootScope.testing = 'true';
  $scope.experimentType = "tcpp";
  $scope.currentStimulus = 0;

  $scope.confirmChoice = function() {
    var r = confirm("Are you sure?");
    if (r == true) {
      $scope.nextStimulus();
    } else {
      // do nothing
    }
  };
  $scope.nextStimulus = function() {
    document.getElementById("audio_instructions_player_source").pause();
    document.getElementById("audio_stimuli_player_source").pause();
    document.getElementById("audio_stimuli_player_source").currentTime = 0;

    // only add a listener if its not the same audio, otherwise just play it
    if ($scope.audioStimulus.indexOf("audio_stimuli/" + $scope.experimentType
        + "/" + tcppAudio[$scope.currentStimulus]) == -1) {
      document.getElementById("audio_stimuli_player_source").addEventListener(
          'canplaythrough', function() {
            document.getElementById("audio_stimuli_player_source").play();
          });
      $scope.audioStimulus = "audio_stimuli/" + $scope.experimentType + "/"
          + tcppAudio[$scope.currentStimulus];
    } else {
      document.getElementById("audio_stimuli_player_source").play();
    }

    var imagenumber = $scope.currentStimulus;
    if (imagenumber == 3) {
      document.getElementById("image_prime").src = "image_stimuli/tcpp/animal2.png";
    }
    if (imagenumber == 5) {
      document.getElementById("image_prime").src = "image_stimuli/tcpp/animal3.png";
    }
    if (imagenumber == 8) {
      document.getElementById("image_prime").src = "image_stimuli/tcpp/animal4.png";
    }
    if (imagenumber == 12) {
      document.getElementById("image_prime").src = "image_stimuli/tcpp/animal5.png";
    }
    var stimuliImageStartPosition = imagenumber * 4;
    document.getElementById("stimuli1").src = "image_stimuli/tcpp/"
        + tcppStimuli[stimuliImageStartPosition];
    document.getElementById("stimuli2").src = "image_stimuli/tcpp/"
        + tcppStimuli[stimuliImageStartPosition + 1];
    document.getElementById("stimuli3").src = "image_stimuli/tcpp/"
        + tcppStimuli[stimuliImageStartPosition + 2];
    document.getElementById("stimuli4").src = "image_stimuli/tcpp/"
        + tcppStimuli[stimuliImageStartPosition + 3];

    // practice don't animate the reinforcement
    if (imagenumber <= 5) {
      if (imagenumber == 5) {
        alert("Ready for the real game?");
      }
      $scope.currentStimulus++;
      return;
    }
    imagenumber = imagenumber - 5;
    if (imagenumber < 10) {
      imagenumber = "0" + imagenumber;
    }
    imagenumber = "/r" + imagenumber + "_caterpillars.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"
        + $scope.experimentType + imagenumber;

    if ($scope.currentStimulus >= tcppAudio.length) {
      window.alert("Good Job!\n\n@Susan: Why are there 14 caterpillars?");
      window.location.replace("#/test/tcpp/congratulations");
    }
    $scope.currentStimulus++;

  };

  $scope.noSave = function() {
    window.location.replace('#/test');
  };

};

function TDFMCtrl($rootScope, $scope, $routeParams) {
  // var tdfmAudio = [ ];

  $rootScope.testing = 'true';
  $scope.experimentType = "tdfm";
  $scope.currentStimulus = 0;

  $scope.confirmChoice = function() {
    var r = confirm("Are you sure?");
    if (r == true) {
      $scope.nextStimulus();
    } else {
      // do nothing
    }
  };
  $scope.nextStimulus = function() {
    document.getElementById("audio_instructions_player_source").pause();
    // $scope.audioStimulus = "audio_stimuli/"+
    // $scope.experimentType+"/"+tcppAudio[$scope.currentStimulus];
    // document.getElementById("audio_stimuli_player_source").addEventListener('canplaythrough',
    // function () {
    // document.getElementById("audio_stimuli_player_source").play()
    // });
    //
    // $scope.currentStimulus++;
    // // var imagenumber= $scope.currentStimulus;
    // // if(imagenumber < 10 ){
    // // imagenumber = "0"+imagenumber;
    // // }
    // imagenumber = "/r"+imagenumber+"_caterpillars.png";
    // document.getElementById("reinforcement_image").src =
    // "image_stimuli/"+$scope.experimentType+imagenumber;
    //		  
    // if($scope.currentStimulus >= tdfmAudio.length){
    // window.alert("Good Job!");
    // window.location.replace("#/test/tdfm/congratulations");
    // }

  };

  $scope.noSave = function() {
    window.location.replace('#/test');
  };

};

function TDFPCtrl($rootScope, $scope, $routeParams) {
  // var tdfpAudio = [ ];

  $rootScope.testing = 'true';
  $scope.experimentType = "tdfp";
  $scope.currentStimulus = 0;

  $scope.confirmChoice = function() {
    var r = confirm("Are you sure?");
    if (r == true) {
      $scope.nextStimulus();
    } else {
      // do nothing
    }
  };
  $scope.nextStimulus = function() {
    document.getElementById("audio_instructions_player_source").pause();
    // $scope.audioStimulus = "audio_stimuli/"+
    // $scope.experimentType+"/"+tdfpAudio[$scope.currentStimulus];
    // document.getElementById("audio_stimuli_player_source").addEventListener('canplaythrough',
    // function () {
    // document.getElementById("audio_stimuli_player_source").play()
    // });

    $scope.currentStimulus++;
    var imagenumber = $scope.currentStimulus;
    if (imagenumber < 10) {
      imagenumber = "0" + imagenumber;
    }
    imagenumber = "/r" + imagenumber + "_daisy.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"
        + $scope.experimentType + imagenumber;

    // if($scope.currentStimulus >= tcppAudio.length){
    if ($scope.currentStimulus >= 12) {
      window.alert("Good Job!");
      window.location.replace("#/test/tdfp/congratulations");
    }

  };

  $scope.noSave = function() {
    window.location.replace('#/test');
  };

};

function NewUserCtrl($scope, Participants, AccessCouch) {

  $scope.cancel = function() {
    location.reload();
  };

  $scope.createNewUser = function(data) {
    var currentParticipantIDs = Participant.query(function() {
      var newParticipantID = generateNewParticipantID(currentParticipantIDs);
      if (newParticipantID == undefined) {
        window.alert("Please try again."); // should this just call
        // generateNewParticipantID() again?
      } else {
        data.JSONType = "participant";
        data.participantID = newParticipantID;
        var newUser = AccessCouch.save(data, function() {
          window.alert("New user created. New user Participant ID: "
              + newParticipantID);
          window.location = "index.html";
        });
      }
    });

  };
};

function SaveYourScoreCtrl($scope, ParticipantsAutocomplete) {

};

function ReportsCtrl($scope, $routeParams) {
  $scope.filterProp = $routeParams.participantID;
};

// End controllers

function generateNewParticipantID(data) {
  var randomParticipantID = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  var duplicatedID;
  // Make sure randomly generated ID doesn't already exist
  for ( var i = 0; i < data.rows.length; i++) {
    if (randomParticipantID == data.rows[i].value.participantID) {
      duplicatedID = 1;
    } else {
      duplicatedID = 0;
    }
  }
  if (duplicatedID == 0) {
    return randomParticipantID;
  } else {
    return;
  }
}

// PartcipantListCtrl.$inject = ['$scope', '$http'];
