var Yelp = require('yelp');


var yelp = new Yelp({
        consumer_key: 'sAfGpK120RkCPH11pGc9Gw', 
        consumer_secret:'bU5bRkNKoeE2MIOqKBtObPIgKAM',
        token:'82ILAmVgY7AodYJL5tzQ6mHVDRK5fZMQ',
        token_secret:'U-IcsZdGjUwZZI2ekZoG68E0zsk'
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