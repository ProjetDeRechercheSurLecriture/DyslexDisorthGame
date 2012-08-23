define([ 
    "libs/backbone.destroyable.view",
    "handlebars", 
    "experiment/Experiment",
    "experimenter/ExperimenterView",
    "participant/ParticipantView",
    "libs/Utils"
], function(
    DestroyableView,
    Handlebars, 
    Experiment,
    ExperimenterView,
    ParticipantView
) {
  var ExperimentView = DestroyableView.extend(
  /** @lends ExperimentView.prototype */
  {
    /**
     * @class This is the experiment view.  
     * 
     * @description Starts the ExperimentView and initializes all its children's views.
     * 
     * @property {String} format May be set when the ExperimentView is
     * initialized. Valid values are "10inch" or "4inch"
     * 
     * @extends DestroyableView
     * @constructs
     */
    initialize : function() {
      DestroyableView.__super__.initialize.call(this);

      Utils.debug("EXPERIMENT VIEW READ init: " );
      this.changeViewsOfInternalModels();
    },
    events : {
      
    },
    
    /**
     * The underlying model of the ExperimentView is a Experiment.
     */    
    model : Experiment,

    /**
     * The Handlebars template rendered if the caller asks for 10inch screen, or if the device has 1024px resolution width or better
     */
    template10inch : Handlebars.templates.experiment_10inch,
    
    /**
     * The Handlebars template rendered if the caller asks for 4inch screen, or if the device has less than 1024px width
     */
    template4inch : Handlebars.templates.experiment_4inch,
    
    /**
     * Renders the ExperimentView and all of its child Views.
     */
    render : function() {
      Utils.debug("EXPERIMENT VIEW READ render: ");
      this.destroy_view();
      

      if (this.format == "10inch") {
    	  Utils.debug("EXPERIMENT READ 10INCH render: ");

    	  this.setElement($("#experiment"));
    	  $(this.el).html(this.template10inch(this.model.toJSON()));

      } else if (this.format == "10inch") {
    	  Utils.debug("EXPERIMENT VIEW READ 4INCH render: ");

    	  this.setElement($("#experiment"));
    	  $(this.el).html(this.template4inch(this.model.toJSON()));

      } else {

    	  // TODO guess which template to use.
    	  this.setElement($("#experiment"));
    	  $(this.el).html(this.template10inch(this.model.toJSON()));
      }
      return this;
    },
    changeViewsOfInternalModels : function(){
      Utils.debug("Connecting the views of internal models in Experiment Read View.");
      
      if(this.currentExperimenterView){
        this.currentExperimenterView.destroy_view();
      }
      this.currentExperimenterView = new ExperimenterView({
        model : this.model.get("experimenter")
      });
      
      if(this.currentParticipantView){
        this.currentParticipantView.destroy_view();
      }
      this.currentParticipantView = new ParticipantView({
        model : this.model.get("participant")
      });
      this.currentParticipantView.format = "glimpse";
      
      if(this.newParticipantView){
        this.newParticipantView.destroy_view();
      }
      this.newParticipantView = new ParticipantView({
        model : this.model.get("participant")
      });
      this.newParticipantView.format = "new";

    }
  });
  return ExperimentView;
});