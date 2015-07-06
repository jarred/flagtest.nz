var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');
var flagTemplate    = require('../templates/flag.ejs');
var API             = require('../api.js');

var FlagView = Backbone.View.extend({
  className: 'flag',
  events: {
    'click .js-wind-toggle': 'toggleWind',
    'click .js-rando-flag': 'newRandomFlag',
    'click .js-enter_flag_id': 'gotoFlag'
  },
  initialize: function(options){
    _.bindAll(this, 'toggleWind', 'newRandomFlag', 'gotoFlag');
    if(options.imageData){
      this.imageData = options.imageData
    }else{
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = this.model.get('src');
      this.imageData = img;
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
  },
  newRandomFlag: function(event){
    event.preventDefault();
    $('.js-preloader').removeClass('hide');
    API.getRandom(function(data){
      window.location = "/?id=" + data.remote_id;
    })
  },
  gotoFlag: function(event){
    event.preventDefault();
    var id = window.prompt('Flag ID (number)');
    if(id){
      window.location = "/?id=" + id
    }
  }
});

module.exports = FlagView;
