var $                   = require('jquery');
var _                   = require('underscore');

var ImageUtil = {
  bufferFromData: function(data, callback){
    var img = new Image();
    var _this = this;
    img.onload = function(){
      console.log('callback', callback);
      _this.imageLoaded(img, callback);
    }
    img.src = data;
  },
  imageLoaded: function(img, callback){
    var w = img.width;
    var h = img.height;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    // $('body').html(canvas);
    var imageData = ctx.getImageData(0, 0, w, h);
    // var buffer = imageData.data.buffer;
    callback(img);
  }
};

module.exports = ImageUtil;
