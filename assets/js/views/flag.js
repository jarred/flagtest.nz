var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');

var FlagView = Backbone.View.extend({
  className: 'flag',
  initialize: function(options){
    console.log(this.model.toJSON())
    this.appModel = options.appModel;
    this.render();
  },
  render: function(){
    this.template = _.template($('.tpl-flag').html());
    this.$el.html(this.template(this.model.toJSON()));
    _.defer(function(){
      window.Flag3D.init();
    });
  }
});

module.exports = FlagView;
