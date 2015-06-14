var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');

var IntroView = Backbone.View.extend({
  events: {
    'click .js-random': 'randomFlag'
  },
  initialize: function(options){
    _.bindAll(this, 'randomFlag');
    this.appModel = options.appModel;
  },
  randomFlag: function(){
    // logic for picking a random flag here...
    this.appModel.trigger('new-flag');
    // console.log(this.appModel);
  }
});

module.exports = IntroView;
