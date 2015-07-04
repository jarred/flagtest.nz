var API = {
  getFlag: function(id, callback){
    $.ajax({
      url: 'http://flagpost.nz/api/public/flag/' + id + '/?callback=?',
      dataType: 'JSONP',
      success: function(data){
        callback(data);
      }
    });
  },
  getRandom: function(callback){
    $.ajax({
      url: 'http://flagpost.nz/api/public/flag/lucky-dip/?callback=?',
      dataType: 'JSONP',
      success: function(data){
        callback(data);
      }
    });
  }
}

module.exports = API;
