define([ 
    "backbone",
    "handlebars", 
    "experimenter/Experimenter",
    "libs/Utils"
], function(
    Backbone,
    Handlebars, 
    Experimenter
) {
  var ExperimenterView = Backbone.View.extend(
  /** @lends ExperimenterView.prototype */
  {
    /**
     * @class This is the experimenter view controller  
     * 
     * @description Starts the ExperimenterView and initializes all its children's views.
     * 
     * @property {String} format May be set when the ExperimenterView is
     * initialized. Valid values are "new" "glimpse" "maskedDetails" confidentialDetails"
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      Utils.debug("EXPERIMENTER VIEW init: " );
      this.changeViewsOfInternalModels();
    },
    events : {
      
    },
    
    /**
     * The underlying model of the ExperimenterView is a Experimenter.
     */    
    model : Experimenter,

    /**
     * The Handlebars template rendered if the caller asks for a new experimenter view
     */
    templateNew : Handlebars.templates.experimenter_new,
    
    /**
     * The Handlebars template rendered if the caller asks for a glimpse of the experimenter (usually an experimenter code)
     */
    templateGlimpse : Handlebars.templates.experimenter_glimpse,
    
    /**
     * The Handlebars template rendered if the caller asks for masked details of a experimenter (usually only a code and test date)
     */
    templateMaskedDetails : Handlebars.templates.experimenter_details_masked,
    
    /**
     * The Handlebars template rendered if the caller asks for all details of a experimenter (this shows all the confidential details)
     */
    templateConfidentialDetails : Handlebars.templates.experimenter_details_including_confidential,
    
    /**
     * Renders the ExperimenterView and all of its child Views.
     */
    render : function() {
      Utils.debug("EXPERIMENTER VIEW render: ");
      this.destroy_view();

      if (this.format == "new") {
        Utils.debug("EXPERIMENTER VIEW NEW render: ");

//        this.setElement($("#new_experimenter"));
//        $(this.el).html(this.templateNew(this.model.toJSON()));

      } else if (this.format == "glimpse") {
        Utils.debug("EXPERIMENTER VIEW GLIMPSE render: ");

        this.setElement($(".experimenter_glimpse"));
        $(this.el).html(this.templateGlimpse(this.model.toJSON()));

      }else {
        Utils.debug("EXPERIMENTER VIEW GLIMPSE render: ");

        this.setElement($("#experimenter_glimpse"));
        $(this.el).html(this.templateGlimpse(this.model.toJSON()));
      }
      return this;
    },
    changeViewsOfInternalModels : function(){
      
    }
  });
  return ExperimenterView;
});