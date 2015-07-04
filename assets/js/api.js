var API = {
  getFlag: function(id, callback){
    callback({"body": "All the corners of the world symbolised simply with triangulated panels pointing towards the unified centre. With the universal black and white star cluster at the leading edge.", "src": "http://flagpost.nz/media/images/.focus-none.max-800x500.9444_LH2OXlB", "votes": 48, "designer": {"name": "sam stradwick", "location": "Auckland"}, "title": "Leading Together", "flagpost_url": "http://flagpost.nz/flags/9444", "remote_id": 9444, "suggester": {"name": "sam stradwick", "location": "Auckland"}, "submission_url": "https://www.govt.nz/browse/engaging-with-government/the-nz-flag-your-chance-to-decide/gallery/design/9444", "id": 515, "tags": {"meaning": [{"total": 1, "id": 71, "name": "Coming together"}, {"total": 1, "id": 19, "name": "Maori"}, {"total": 1, "id": 2, "name": "Contemporary"}, {"total": 1, "id": 21, "name": "British"}, {"total": 1, "id": 1, "name": "Biculturalism"}], "graphic": [{"total": 2, "id": 44, "name": "Southern Cross"}, {"total": 1, "id": 45, "name": "Stars"}, {"total": 1, "id": 34, "name": "Cross"}, {"total": 1, "id": 31, "name": "Black"}, {"total": 1, "id": 42, "name": "Red"}]}});
  },
  getRandom: function(callback){
    $.ajax({
      url: 'http://flagpost.nz/api/public/flag/lucky-dip/?callback=?',
      dataType: 'JSONP',
      success: function(data){
        console.log('getRandom', data);
        callback(data);
      }
    });
  }
}

module.exports = API;
