define([ 
    "libs/backbone.destroyable.view",
    "handlebars", 
    "participant/Participant",
    "libs/Utils"
], function(
    DestroyableView,
    Handlebars, 
    Participant
) {
  var ParticipantView = DestroyableView.extend(
  /** @lends ParticipantView.prototype */
  {
    /**
     * @class This is the participant view controller  
     * 
     * @description Starts the ParticipantView and initializes all its children's views.
     * 
     * @property {String} format May be set when the ParticipantView is
     * initialized. Valid values are "new" "glimpse" "maskedDetails" confidentialDetails"
     * 
     * @extends DestroyableView
     * @constructs
     */
    initialize : function() {
      DestroyableView.__super__.initialize.call(this);

      Utils.debug("PARTICIPANT VIEW init: " );
      this.changeViewsOfInternalModels();
    },
    events : {
      
    },
    
    /**
     * The underlying model of the ParticipantView is a Participant.
     */    
    model : Participant,

    /**
     * The Handlebars template rendered if the caller asks for a new participant view
     */
    templateNew : Handlebars.templates.participant_new,
    
    /**
     * The Handlebars template rendered if the caller asks for a glimpse of the participant (usually an participant code)
     */
    templateGlimpse : Handlebars.templates.participant_glimpse,
    
    /**
     * The Handlebars template rendered if the caller asks for masked details of a participant (usually only a code and test date)
     */
    templateMaskedDetails : Handlebars.templates.participant_details_masked,
    
    /**
     * The Handlebars template rendered if the caller asks for all details of a participant (this shows all the confidential details)
     */
    templateConfidentialDetails : Handlebars.templates.participant_details_including_confidential,
    
    /**
     * Renders the ParticipantView and all of its child Views.
     */
    render : function() {
      Utils.debug("PARTICIPANT VIEW render: ");
      this.destroy_view();

      if (this.format == "new") {
        Utils.debug("PARTICIPANT VIEW NEW render: ");

        this.setElement($("#new_participant"));
        $(this.el).html(this.templateNew(this.model.toJSON()));

      } else if (this.format == "glimpse") {
        Utils.debug("PARTICIPANT VIEW GLIMPSE render: ");

        this.setElement($("#participant_glimpse"));
        $(this.el).html(this.templateGlimpse(this.model.toJSON()));

      }
      return this;
    },
    changeViewsOfInternalModels : function(){
      
    }
  });
  return ParticipantView;
});