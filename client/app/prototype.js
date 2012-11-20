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

demo_show_next = function() {
  alert("going to next stimuli");
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
            alert("This will play some audio instructions, or show text instructions depending on a user setting");
          };
        });

var sailsAudio = [ "sails_instructions.mp3", "GR02A_Gris_MOD.mp3",
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
