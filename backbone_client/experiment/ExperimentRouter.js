define([ 
    "backbone",
    "libs/Utils"
], function(
    Backbone
) {
  var ExperimentRouter = Backbone.Router.extend(
  /** @lends ExperimentRouter.prototype */
  {
    /**
     * @class Routes URLs to different dashboard layouts and data. As a backbone is
     *        a one page app, this shows and hides different "pages", for
     *        example it starts out with a new participant view.
     * 
     * @extends Backbone.Router
     * @constructs
     */
    initialize : function() {
    },

    routes : {
      "results/:participantid"        : "showResults",
      "experiment/:subexperimentid"   : "showExperiment",
      ""                              : "showNewParticipant"
    },

    /**
     * Shows the subexperimentid which is requested
     * 
     * @param subexperimentid ID of which subexperiment to show.
     */
    showExperiment : function(subexperimentid) {
      Utils.debug("In showExperiment: " + subexperimentid);
      this.hideEverything();
      $("#image_stimuli_presentation_area").show();
      if (!subexperimentid) {
        subexperimentid = "";
      }
      
      window.experimentView.render();

      //this is to be sure that the parameters in the url are properly formed
//      window.location.href = "#experiment/" + subexperimentid;
    },
    /**
     * Displays the new participant modal so that the experimenter can create a participant and begin the experiment
     */
    showNewParticipant : function() {
      Utils.debug("In showNewParticipant: ");

      this.hideEverything();
      window.experimentView.newParticipantView.render();
      $('#new_participant').modal("show");
//      window.location.href = "#";
    },

    /**
     * Show the results depending on the participantid passed in, if none is passed in it displays the current participant.
     * 
     * @param participantid ID of participant to show for results 
     */
    showResults : function(participantid) {
      Utils.debug("In showNewParticipant: " + participantid);

      if (participantid) {
        if (participantid != window.ex.get("currentParticipant")) {
          //TODO get participant results if userid != currentParticipant
        } else if (participantid == "all") {
          //TODO show all participant results
        }
      } else {
        participantid = window.ex.get("currentParticipant");
      }
      this.hideEverything();
      $('#results_dashboard').modal("show");
//      window.location.href = "#results/" + participantid;
    },
    /*
     * Hides all divs that can appear in the middle div area, this gives the dashboard effect
     */
    hideEverything : function() {
      $("#image_stimuli_presentation_area").hide();
      $("#results_dashboard").hide();
    }
  });

  return ExperimentRouter;
});
