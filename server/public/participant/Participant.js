define([ 
    "backbone",
    "libs/Utils"
], function(
    Backbone
) {
  var Participant = Backbone.Model.extend(
  /** @lends Participant.prototype */
  {
    /**
     * @class Participant TODO add description here
     * 
     * @description Initialize function
     * 
     * @extends Backbone.Model
     * 
     * @constructs
     */
    initialize : function() {

    },
    
    defaults : {
    
    },
    
    // Internal models: used by the parse function
    internalModels : {
      //none
    }
  });

  return Participant;
});