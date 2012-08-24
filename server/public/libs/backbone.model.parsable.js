define([ 
    "backbone" 
], function(
    Backbone
) {
  var Backbone.Model = Backbone.Model.extend(
  /** @lends Backbone.Model.prototype */
  {
    /**
     * @class Backbone.Model makes it possible to parse json objects into internal models, if their type is declared in "internalModels"
     * 
     * @extends Backbone.Model
     * 
     * @constructs
     */
	// parse models
	 parse : function(response) {
	    // parse internal models
	    if (response.ok === undefined) {
	      for (var key in this.model) {
	        var embeddedClass = this.model[key];
	        var embeddedData = response[key];
	        response[key] = new embeddedClass(embeddedData, {parse:true});
	      }
	    }
	  
	    // adjust rev
	    if (response.rev) {
	      response._rev = response.rev;
	      delete response.rev;
	    }
	  
	    // adjust id
	    if (response.id) {
	      response._id = response.id;
	      delete response.id;
	    }
	  
	    // remove ok
	    delete response.ok;
	  
	    return response;
	  }
    /*
     * Sample Internal models: used by the parse function
     internalModels : {
  		fish : Fish,
  		potato : Potato
     }
     */ 
    
  });

  return Backbone.Model;
});