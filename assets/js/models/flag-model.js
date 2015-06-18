var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');

var FlagModel = new Backbone.Model({
  defaults: {
    fromUpload: true
  }
});

module.exports = FlagModel;
