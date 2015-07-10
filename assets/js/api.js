var API = {
  getFlag: function(id, callback){
    $.ajax({
      url: 'http://flagpost.nz/api/public/flag/' + id + '/?callback=?',
      dataType: 'JSONP',
      success: function(data){
        data.dmf = null;
        callback(data);
      },
      error: function(){
        window.alert('Couldn\'t find that flag :( Sorry!');
        window.location = '/'
      }
    });
  },
  getRandom: function(callback){
    $.ajax({
      url: 'http://flagpost.nz/api/public/flag/lucky-dip/?callback=?',
      dataType: 'JSONP',
      success: function(data){
        data.dmf = null;
        callback(data);
      }
    });
  }
}

module.exports = API;
