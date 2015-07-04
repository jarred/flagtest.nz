var FlagTest = window.FlagTest || (window.FlagTest = {});
var $                   = require('jquery');
global.jQuery           = $;
window.$                = $;
var _                   = require('underscore');
var Backbone            = require('backbone');
Backbone.$ = $;
var ImageUtil           = require('./util/image.js');
var StringUtil          = require('./util/string.js');
var Velocity            = require('velocity-animate');
//
// var Flag3D = require('./flag3d.js');
// var FlagPhysics = require('./vendor/flag-physics.js');
// var THREE = require('./vendor/three50dev2.js');
// var attachFastClick     = require('fastclick');
// attachFastClick(document.body);

var API                 = require('./api.js');

var Models = {}

var Views = {
  Intro:                require('./views/intro.js'),
  Flag:                 require('./views/flag.js'),
  Upload:               require('./views/upload.js')
};

var AppModel = new Backbone.Model();

console.log(Velocity);

FlagTest.Main = {
  init: function(){
    _.bindAll(this, 'newFlag', 'newFlagFromUpload');
    AppModel.on('new-flag', this.newFlag);
    AppModel.on('new-flag-from-upload', this.newFlagFromUpload);
    this.extendViews();
    if(window.location.search){
      var data = StringUtil.queryStringToJSON(window.location.search);
      if(data.id){
        this.showFlag(data.id);
      }
    }else{
      this.hidePreloader();
    }
  },
  extendViews: function (){
    _.each($('.js-view'), function(el){
      var $el = $(el);
      var view = Views[($el.data('view'))];
      var v = new view({
        el: el,
        appModel: AppModel
      });
      $el.removeClass('js-view');
    });
  },
  newFlag: function(){
    var _this = this;
    API.getRandom(function(data){
      window.location = "/?id=" + data.remote_id;
    })
  },
  newFlagFromUpload: function(uploadEvent){
    var _this = this;
    ImageUtil.bufferFromData(uploadEvent.target.result, function(imageData){
      _this.createFlagFromImageData(imageData);
      // console.log('imgBuffer', buffer);
    });
  },
  hidePreloader: function(){
    var el = $('.js-preloader');
    el.velocity({
      opacity: 0
    }, {
      complete: function(){
        el.addClass('hide');
      }
    })
  },
  createFlagFromImageData: function(imageData){
    console.log('createFlagFromImageData', imageData);
    var flagModel = new Backbone.Model({
      fromUpload: true
    });
    var flag = new Views.Flag({
      model: flagModel,
      imageData: imageData
    });
    $('.js-skyline').html(flag.el);
  },
  showFlag: function(id){
    var _this = this;
    API.getFlag(id, function(data){
      data.fromUpload = false;
      var flagModel = new Backbone.Model(data);
      var flag = new Views.Flag({
        model: flagModel
      });
      $('.js-skyline').html(flag.el);
      _this.hidePreloader();
    })
  }
};
FlagTest.Main.init();
