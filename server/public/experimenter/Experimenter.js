define([ 
    "libs/backbone.model.parsable",
    "libs/Utils"
], function(
    ParseableModel
) {
  var Experimenter = ParseableModel(
  /** @lends Experimenter.prototype */
  {
    /**
     * @class Experimenter TODO add description here
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

  return Experimenter;
});