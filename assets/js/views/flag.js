var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');
var flagTemplate    = require('../templates/flag.ejs');

var FlagView = Backbone.View.extend({
  className: 'flag',
  events: {
    'click .js-wind-toggle': 'toggleWind'
  },
  initialize: function(options){
    _.bindAll(this, 'toggleWind');
    if(options.imageData){
      this.imageData = options.imageData
    }
    this.appModel = options.appModel;
    this.render();
  },
  render: function(){
    // this.template = _.template($('.tpl-flag').html());
    this.$el.html(flagTemplate(this.model.toJSON()));
    var _this = this;
    _.defer(function(){
      window.Flag3D.init(_this.imageData);
    });
  },
  toggleWind: function(event){
    var $el = $(event.target).closest('.js-wind-toggle');
    if($el.hasClass('off')){
      $el.removeClass('off');
    }else{
      $el.addClass('off');
    }
    window.Flag3D.toggleWind(!$el.hasClass('off'));
  }
});

module.exports = FlagView;
