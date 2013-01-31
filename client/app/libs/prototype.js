$(".demo_confirm_box").each(function() {
  this.onclick = function() {
    var r = confirm("Are you sure?");
    if (r == true) {
      demo_show_next();
    } else {
      // do nothing
    }
  };
});
window.experimentType = "sails";
demo_show_next = function() {
  var experimentAudio = sailsAudio;
  var currentReinforcementImageFolder = document
      .getElementById("reinforcement_image").src;
  if (currentReinforcementImageFolder.indexOf("sails") >= 0) {
    window.experimentType = "sails";
  } else if (currentReinforcementImageFolder.indexOf("tcpp") >= 0) {
    window.experimentType = "tcpp";
    experimentAudio = tcppAudio;
  } else if (currentReinforcementImageFolder.indexOf("tdfp") >= 0) {
    window.experimentType = "tdfp";
  } else if (currentReinforcementImageFolder.indexOf("tdfm") >= 0) {
    window.experimentType = "tdfm";
  }
  // alert("going to next stimuli");
  document.getElementById("audio_instructions_player_source").pause();

  document.getElementById("audio_stimuli_player_source").src = "audio_stimuli/"
      + window.experimentType + "/" + experimentAudio[stimuliIndex];
  document.getElementById("audio_stimuli_player_source").play();
  var imagenumber = stimuliIndex;

  if (window.experimentType == "sails") {
    if (imagenumber < 10) {
      imagenumber = "0" + imagenumber;
    }
    imagenumber = "/r" + imagenumber + "_mouse_cheese.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"
        + window.experimentType + imagenumber;
  }
  if (window.experimentType == "tcpp") {

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
    var stimuliImageStartPosition = imagenumber*4;
    document.getElementById("stimuli1").src = "image_stimuli/tcpp/"+tcppStimuli[stimuliImageStartPosition];
    document.getElementById("stimuli2").src = "image_stimuli/tcpp/"+tcppStimuli[stimuliImageStartPosition+1];
    document.getElementById("stimuli3").src = "image_stimuli/tcpp/"+tcppStimuli[stimuliImageStartPosition+2];
    document.getElementById("stimuli4").src = "image_stimuli/tcpp/"+tcppStimuli[stimuliImageStartPosition+3];

    
    // practice dont show the reinforcement
    if (imagenumber <= 5) {
      if (imagenumber == 5) {
        alert("Ready?");
      }
      window.stimuliIndex++;
      return;
    }
    imagenumber = imagenumber - 5;
    if (imagenumber < 10) {
      imagenumber = "0" + imagenumber;
    }
    imagenumber = "/r" + imagenumber + "_caterpillars.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"
        + window.experimentType + imagenumber;

  }

  var finished = false;
  if (window.experimentType == "sails"
      && window.stimuliIndex >= window.sailsAudio.length) {
    finished = true;
  }
  if (window.experimentType == "tcpp"
      && window.stimuliIndex >= window.tcppAudio.length) {
    finished = true;
  }
  if (finished) {
    alert("Good work!\n\n" + "Why are there 14 caterpillars?");
    window.location.replace("index.html#/test/sails/congratulations");
  }
  window.stimuliIndex++;

};
demo_show_previous = function() {
  alert("going to previous stimuli");
};

$(".icon-forward").each(function() {
  this.onclick = window.demo_show_next;
});
$(".icon-backward").each(function() {
  this.onclick = window.demo_show_previous;
});

$(".icon-question-sign").each(function() {
  this.onclick = function() {
    // alert("This will play some audio instructions, or show text instructions
    // depending on a user setting");
    document.getElementById("audio_instructions_player_source").play();
  };
});
var stimuliIndex = 0;
var sailsAudio = [ "GR02A_Gris_MOD.mp3", "GR19A_Gris_MOD.mp3",
    "GR27D_Gris_MOD.mp3", "GR04A_Gris_MOD.mp3", "GR20A_Gris_MOD.mp3",
    "GR28A_Gris_MOD.mp3", "GR05A_Gris_MOD.mp3", "GR20B_Gris_MOD.mp3",
    "NI29A_Gris_MOD.mp3", "GR06A_Gris_MOD.mp3", "GR20C_Gris_MOD.mp3",
    "NI29B_Gris_MOD.mp3", "GR10B_Gris_MOD.mp3", "GR21A_Gris_MOD.mp3",
    "NI30A_Gris_MOD.mp3", "GR12A_Gris_MOD.mp3", "GR21B_Gris_MOD.mp3",
    "NI32A_Gris_MOD.mp3", "GR16B_Gris_MOD.mp3", "GR21C_Gris_MOD.mp3",
    "NI33A_Gris_MOD.mp3", "GR17A_Gris_MOD.mp3", "GR27A_Gris_MOD.mp3",
    "GR18A_Gris_MOD.mp3", "GR27C_Gris_MOD.mp3" ];

var tcppAudio = [ "1.mp3", "1.mp3", "1.mp3", "2.mp3", "2.mp3", "3.mp3",
    "3.mp3", "3.mp3", "4.mp3", "4.mp3", "4.mp3", "4.mp3", "5.mp3", "5.mp3",
    "5.mp3", "5.mp3" ];
// long version "5.mp3", "6.mp3", ,
// "7.mp3", "8.mp3", "9.mp3", "10.mp3",
// "11.mp3","12.mp3"

var tcppStimuli = [ "01_feu.png", "02_chat.png", "03_but.png", "04_scie.png",
    "05_jus.png", "06_lit.png", "07_dent.png", "08_pain.png", "09_bas.png",
    "10_cou.png", "11_gants.png", "12_nid.png", "13_mouche.png",
    "14_canne.png", "15_balle.png", "16_tuque.png", "17_poire.png",
    "18_niche.png", "19_auto.png", "20_singe.png", "21_vent.png", "22_fee.png",
    "23_main.png", "24_salade.png", "25_joue.png", "02_chat.png", "26_nez.png",
    "27_banc.png", "28_the.png", "29_bain.png", "30_sou.png", "31_riz.png",
    "32_colle.png", "33_lac.png", "34_bouche.png", "35_suce.png",
    "36_tente.png", "37_jupe.png", "38_bol.png", "39_neige.png", "40_bac.png",
    "41_sol.png", "42_loupe.png", "43_pomne.png", "44_quille.png",
    "45_soupe.png", "46_tasse.png", "47_vol.png", "48_cheveux.png",
    "49_jambon.png", "50_cafe.png", "51_panda.png", "52_sofa.png",
    "53_chapeau.png", "54_ballon.png", "55_lapin.png", "56_tapis.png",
    "57_fusee.png", "58_lama.png", "59_patin.png", "60_maison.png",
    "61_soulier.png", "62_pizza.png", "63_bateau.png" ];