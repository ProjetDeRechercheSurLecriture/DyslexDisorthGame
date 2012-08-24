define([ 
    "backbone",
    "libs/Utils"
], function(
    Backbone
) {
  var Experimenter = Backbone.Model.extend(
  /** @lends Experimenter.prototype */
  {
    /**
     * @class Experimenter TODO add description here
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

  return Experimenter;
});