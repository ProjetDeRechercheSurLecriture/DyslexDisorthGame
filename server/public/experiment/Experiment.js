define([ 
    "backbone" 
], function(
    Backbone
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
    },
    
    defaults : {
    
    },
    
    // Internal models: used by the parse function
    internalModels : {
      // There are no nested models
    }
  });

  return Experiment;
});