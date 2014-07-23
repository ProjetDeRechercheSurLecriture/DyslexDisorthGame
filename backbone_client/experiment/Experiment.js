define([ 
    "backbone",
    "experimenter/Experimenter",
    "participant/Participant",
    "libs/Utils"
], function(
    Backbone,
    Experimenter,
    Participant
) {
  var Experiment = Backbone.Model.extend(
  /** @lends Experiment.prototype */
  {
    /**
     * @class Experiment TODO add description here
     * 
     * @description Initialize function
     * 
     * @extends Backbone.Model
     * 
     * @constructs
     */
    initialize : function() {

      if(!this.get("experimenter")){
        this.set("experimenter", new Experimenter());
      }
      if(!this.get("participant")){
        this.set("participant", new Participant());
      }
    },
    
    defaults : {
    
    },
    
    // Internal models: used by the parse function
    internalModels : {
      participant: Participant,
      experimenter : Experimenter
    }
  });

  return Experiment;
});