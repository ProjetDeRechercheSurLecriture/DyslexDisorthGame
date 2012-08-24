define([ 
    "backbone",
    "lib/Utils"
], function(Backbone) {
var DestroyableView = Backbone.View.extend(
/** @lends DestroyableView.prototype */
{
  /**
   * @class This is the destroyable view.  
   * 
   * @description Can be extended to add the destroy_view method to the view. 
   * 
   * @extends Backbone.View
   * @constructs
   */
    initialize : function() {
      Utils.debug("Intializing a DestroyableView view");
    },
    /**
     * 
     * http://stackoverflow.com/questions/6569704/destroy-or-remove-a-view-in-backbone-js
     */
    destroy_view : function() {
      Utils.debug("DESTROYING A VIEW");
      // COMPLETELY UNBIND THE VIEW
      this.undelegateEvents();

      $(this.el).removeData().unbind();

      // Remove view from DOM
      // this.remove();
      // Backbone.View.prototype.remove.call(this);
    }
  });
  return DestroyableView;
});