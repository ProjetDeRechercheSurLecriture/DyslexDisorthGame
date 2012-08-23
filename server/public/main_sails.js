// Set the RequireJS configuration
require.config({
	paths : {
		"text" : "libs/text",
		"jquery" : "libs/jquery",
		"underscore" : "libs/underscore",
		"backbone" : "libs/backbone",
		"handlebars" : "libs/handlebars.runtime",
		"compiledTemplates" : "libs/compiled_handlebars",
		"bootstrap" : "libs/bootstrap/js/bootstrap",
		"bootstrap-transition" : "libs/bootstrap/js/bootstrap-transition",
		"bootstrap-alert" : "libs/bootstrap/js/bootstrap-alert",
		"bootstrap-modal" : "libs/bootstrap/js/bootstrap-modal",
		"bootstrap-dropdown" : "libs/bootstrap/js/bootstrap-dropdown",
		"bootstrap-scrollspy" : "libs/bootstrap/js/bootstrap-scrollspy",
		"bootstrap-tab" : "libs/bootstrap/js/bootstrap-tab",
		"bootstrap-tooltip" : "libs/bootstrap/js/bootstrap-tooltip",
		"bootstrap-popover" : "libs/bootstrap/js/bootstrap-popover",
		"bootstrap-button" : "libs/bootstrap/js/bootstrap-button",
		"bootstrap-collapse" : "libs/bootstrap/js/bootstrap-collapse",
		"bootstrap-carousel" : "libs/bootstrap/js/bootstrap-carousel",
		"bootstrap-typeahead" : "libs/bootstrap/js/bootstrap-typeahead"
	},
	shim : {
		"underscore" : {
			exports : "_"
		},

		"jquery" : {
			exports : "$"
		},
		"bootstrap" : {
			deps : [ "jquery" ],
			exports : function($) {
				return $;
			}
		},

		"bootstrap-typeahead" : {
			deps : [ "jquery", "bootstrap", "bootstrap-transition",
					"bootstrap-alert", "bootstrap-modal", "bootstrap-dropdown",
					"bootstrap-scrollspy", "bootstrap-tab",
					"bootstrap-tooltip", "bootstrap-popover",
					"bootstrap-button", "bootstrap-collapse",
					"bootstrap-carousel" ],
			exports : function($) {
				return $;
			}
		},

		"backbone" : {
			deps : [ "underscore", "jquery", "compiledTemplates" ],
			exports : function(_, $) {
				return Backbone;
			}
		},

		"handlebars" : {
			deps : [ "bootstrap", "jquery" ],
			exports : "Handlebars"
		},

		"compiledTemplates" : {
			deps : [ "handlebars" ],
			exports : function(Handlebars) {
				return Handlebars;
			}
		},

	}
});

// Initialization
require([ "backbone", 
          "experiment/Experiment",
          "experiment/ExperimentView",
          "experiment/ExperimentRouter",
          "libs/Utils" 
  ], function(
		requiringbackboneearlytoensureallisloaded,
		Experiment,
		ExperimentView,
		ExperimentRouter
) {

	/*
	 * Start the pub sub hub
	 */
	window.hub = {};
	Utils.makePublisher(window.hub);

	/*
	 * Check for user's cookie and the dashboard so we can load it
	 */
	var username = Utils.getCookie("username");
	if (username != null && username != "") {
		alert("Welcome again " + username);
	} else {
		// new user, let them register or login as themselves or sallytomato
	}

	window.experiment = new Experiment({
		"title" : "SAILS"
	});
	window.experimentView = new ExperimentView({
		"model" : window.experiment
	});
	window.experimentView.render();
	
	Utils.debug("Starting the router");
	// Start the Router
	window.experiment.router = new ExperimentRouter();
  Backbone.history.start();
	

});
