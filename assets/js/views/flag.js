var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');
var flagTemplate    = require('../templates/flag.ejs');

var FlagView = Backbone.View.extend({
  className: 'flag',
  initialize: function(options){
    console.log(this.model.toJSON())
    this.appModel = options.appModel;
    this.render();
  },
  render: function(){
    // this.template = _.template($('.tpl-flag').html());
    this.$el.html(flagTemplate(this.model.toJSON()));
    var _this = this;
    _.defer(function(){
      window.Flag3D.init(_this.model.get('uploadEvent'));
    });
  }
});

module.exports = FlagView;
