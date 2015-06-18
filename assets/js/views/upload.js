var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');

var UploadView = Backbone.View.extend({
  events: {
    'change input': 'handleUpload'
  },
  initialize: function(options){
    _.bindAll(this, 'handleUpload');
    this.appModel = options.appModel;
  },
  handleUpload: function(event){
    console.log('handleUpload', event);
    var _this = this;
    var f = event.target.files[0];
    var fr = new FileReader();
    fr.onload = function(ev2) {
        _this.appModel.trigger('new-flag-from-upload', ev2);
    };
    fr.readAsDataURL(f);
  }

});

module.exports = UploadView;
