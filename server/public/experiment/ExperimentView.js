define([ 
    "backbone",
    "handlebars", 
    "experiment/Experiment",
    "experimenter/Experimenter",
    "experimenter/ExperimenterView",
    "participant/ParticipantView",
    "libs/Utils"
], function(
    Backbone,
    Handlebars, 
    Experiment,
    Experimenter,
    ExperimenterView,
    ParticipantView
) {
  var ExperimentView = Backbone.View.extend(
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
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      Utils.debug("EXPERIMENT VIEW READ init: " );
      
      var self = this;
      this.model.get("participant").bind('change:experimenterCode', function(participant){
        Utils.debug("Loading experimenter: "+participant.get("experimenterCode"));
        console.log(self, participant);
        var e = new Experimenter( {"experimenterCode" : participant.get("experimenterCode")} );
        self.model.set("experimenter", e);
        self.currentExperimenterView.model = e;
//        self.currentExperimenterView.render(); //no need to render, at this point the view might not even have been created.
      }, this);
      
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
      
      var screen_width = $(document).width();
      var screen_height = $(document).height();
      var screen_ratio = screen_width/screen_height;
      this.setElement($("#experiment"));
      
      if (this.format == "10inch") {
    	  Utils.debug("EXPERIMENT READ 10INCH render: ");
    	  $(this.el).html(this.template10inch(this.model.toJSON()));
    	  
      } else if (this.format == "10inch") {
    	  Utils.debug("EXPERIMENT VIEW READ 4INCH render: ");
    	  $(this.el).html(this.template4inch(this.model.toJSON()));

      } else {
        //Guess which layout to use
        if (screen_height > 1000 || screen_width > 1000) {
          Utils.debug("EXPERIMENT READ 10INCH render: ");
          $(this.el).html(this.template10inch(this.model.toJSON()));
        } else {
          Utils.debug("EXPERIMENT READ 10INCH render: ");
          $(this.el).html(this.template10inch(this.model.toJSON()));
        }
      }
      
      this.currentExperimenterView.render();
      this.currentParticipantView.render();
      
      /*
       * Size the dashboard to make sure it fits nicely
       */
      

      var dashboard_ratio = $("#experiment").width()  / $("#experiment").height();
      Utils.debug("Screen width: " + screen_width + "Screen height: "
          + screen_height + "Pictures width: "
          + $("#experiment").width() + "Pictures height: "
          + $("#experiment").height());
      Utils.debug("Screen ratio: " + screen_ratio + "Pictures ratio: "
          + dashboard_ratio);
      var landscape = screen_width > screen_height;
      if (landscape == true) {
        $(".experiment_sails").css({
          'width' : screen_width*0.9,
          'margin-left' : (screen_width*0.1) / 2
        });
        
//        if(screen_ratio  > dashboard_ratio){
//          var new_width = $("#experiment").width()/$("#experiment").height()*screen_height;
//          Utils.debug("Resizing the width of the experiment dashboard: " + new_width);
//          $("#experiment").css({
//            'width' : new_width,
//            'height' : screen_height,
//            'margin-left' : (screen_width - new_width) / 2
//          });
//        }else{
//          var new_height = $("#experiment").height()/$("#experiment").width()*screen_width;
//          Utils.debug("Resizing the height of the experiment dashboard: " + new_height);
//          $("#experiment").css({
//            'width' : screen_width,
//            'height' : new_height,
//            'margin-top' : (screen_height - new_height) / 2
//          });
//        }
//      } else {
//        Utils.debug("Resizing the width of the experiment dashboard: "
//            + screen_width);
//        $("#experiment").css({
//          'width' : screen_width - 200
//        });
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