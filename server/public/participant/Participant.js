define([ 
    "libs/backbone.model.parsable",
    "libs/Utils"
], function(
    ParseableModel
) {
  var Participant = ParseableModel(
  /** @lends Participant.prototype */
  {
    /**
     * @class Participant TODO add description here
     * 
     * @description Initialize function
     * 
     * @extends ParseableModel
     * 
     * @constructs
     */
    initialize : function() {
      ParseableModel.__super__.initialize.call(this, attributes);

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