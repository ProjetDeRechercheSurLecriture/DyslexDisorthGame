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
  var currentReinforcementImageFolder = document.getElementById("reinforcement_image").src.replace("image_stimuli/","");
  if(currentReinforcementImageFolder.indexOf("sails")== 0){
    window.experimentType = "sails";
  }else if(currentReinforcementImageFolder.indexOf("tcpp")== 0){
    window.experimentType = "tcpp";
  }else if(currentReinforcementImageFolder.indexOf("tdfp")== 0){
    window.experimentType = "tdfp";
  }else if(currentReinforcementImageFolder.indexOf("tdfm")== 0){
    window.experimentType = "tdfm";
  }
//  alert("going to next stimuli");
  document.getElementById("audio_instructions_player_source").pause();

  document.getElementById("audio_stimuli_player_source").src = "audio_stimuli/"+window.experimentType+"/"+sailsAudio[sailsStimuliIndex];
  document.getElementById("audio_stimuli_player_source").play();
  window.sailsStimuliIndex++;
  var imagenumber= sailsStimuliIndex;
  if(window.experimentType == "sails"){
    if(imagenumber < 10 ){
      imagenumber = "0"+imagenumber;
    }
    imagenumber = "/r"+imagenumber+"_mouse_cheese.png";
    document.getElementById("reinforcement_image").src = "image_stimuli/"+window.experimentType+imagenumber;
  }
  
  if(window.sailsStimuliIndex >= window.sailsAudio.length){
    alert("Good Job!");
    window.location.replace("index.html");
  }
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

$(".icon-question-sign")
    .each(
        function() {
          this.onclick = function() {
//            alert("This will play some audio instructions, or show text instructions depending on a user setting");
            document.getElementById("audio_instructions_player_source").play();
          };
        });
var sailsStimuliIndex = 0;
var sailsAudio = [ "GR02A_Gris_MOD.mp3",
    "GR19A_Gris_MOD.mp3", "GR27D_Gris_MOD.mp3", "GR04A_Gris_MOD.mp3",
    "GR20A_Gris_MOD.mp3", "GR28A_Gris_MOD.mp3", "GR05A_Gris_MOD.mp3",
    "GR20B_Gris_MOD.mp3", "NI29A_Gris_MOD.mp3", "GR06A_Gris_MOD.mp3",
    "GR20C_Gris_MOD.mp3", "NI29B_Gris_MOD.mp3", "GR10B_Gris_MOD.mp3",
    "GR21A_Gris_MOD.mp3", "NI30A_Gris_MOD.mp3", "GR12A_Gris_MOD.mp3",
    "GR21B_Gris_MOD.mp3", "NI32A_Gris_MOD.mp3", "GR16B_Gris_MOD.mp3",
    "GR21C_Gris_MOD.mp3", "NI33A_Gris_MOD.mp3", "GR17A_Gris_MOD.mp3",
    "GR27A_Gris_MOD.mp3", "GR18A_Gris_MOD.mp3", "GR27C_Gris_MOD.mp3" ];

var tcppAudio = [ "1.mp3", "3.mp3", "8.mp3", "10.mp3", "4.mp3", "9.mp3",
    "11.mp3", "5.mp3", "tcpp_instructions.mp3", "12.mp3", "6.mp3",
    "tcpp_practice2.mp3", "2.mp3", "7.mp3" ];
