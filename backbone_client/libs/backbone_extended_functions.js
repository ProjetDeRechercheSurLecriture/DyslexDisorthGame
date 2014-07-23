// parse models
Backbone.Model.prototype.parse = function(response) {
  // parse internal models
  if (response.ok === undefined) {
    for ( var key in this.internalModels) {
      var embeddedClass = this.internalModels[key];
      var embeddedData = response[key];
      response[key] = new embeddedClass(embeddedData, {
        parse : true
      });
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
};

//parse collections
Backbone.Collection.prototype.parse = function(response) {
  return response.rows && _.map(response.rows, function(row) { 
    return row.doc || row.value; 
  });
};
/**
 * 
 * http://stackoverflow.com/questions/6569704/destroy-or-remove-a-view-in-backbone-js
 */
Backbone.View.prototype.destroy_view = function() {
  Utils.debug("DESTROYING A VIEW");
  // COMPLETELY UNBIND THE VIEW
  this.undelegateEvents();

  $(this.el).removeData().unbind();

  // Remove view from DOM
  // this.remove();
  // Backbone.View.prototype.remove.call(this);
};