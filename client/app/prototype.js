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