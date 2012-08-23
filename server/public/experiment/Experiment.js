define([ 
    "libs/backbone.model.parsable",
    "experimenter/Experimenter",
    "participant/Participant",
    "libs/Utils"
], function(
    ParseableModel,
    Experimenter,
    Participant
) {
  var Experiment = ParseableModel(
  /** @lends Experiment.prototype */
  {
    /**
     * @class Experiment TODO add description here
     * 
     * @description Initialize function
     * 
     * @extends ParseableModel
     * 
     * @constructs
     */
    initialize : function() {
      ParseableModel.__super__.initialize.call(this, attributes);

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