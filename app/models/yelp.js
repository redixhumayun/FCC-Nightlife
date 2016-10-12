var Yelp = require('yelp');


var yelp = new Yelp({

});

exports.search = function(location, callback){
  yelp.search({
      location: location, 
      limit:10,
      category_filter:'nightlife'
  }).then(function(data){
     callback(data);
  }).catch(function(err){
     console.log(err); 
  });
};