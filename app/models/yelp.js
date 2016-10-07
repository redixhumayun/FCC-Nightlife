var Yelp = require('yelp');


var yelp = new Yelp({
        consumer_key: 'xxxxx', 
        consumer_secret:'xxxxxxxxxxxxxx',
        token:'xxxxxxxxxxxxxx',
        token_secret:'xxxxxxxxxxxxxx'
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