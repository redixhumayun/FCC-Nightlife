'use strict';

var yelp = require('../models/yelp.js');
var bars = require('../models/bars.js');

function ClickHandler () {

	//calls the yelp api through yelp-node in the yelp.js file
	this.yelpRequest = function(req, res, callback){
		console.log(req.body);
		yelp.search(req.body.text, function(data){
			callback(data);
		});
	}, 
	
	this.addGoingToBar = function(req, callback){
		bars.insertUserGoingToBar(req, function(err, data){
			console.log('Inside the clickHandler function');
			if(err){
				throw err;
			}
			console.log(data);
			callback(null, data)
		});
	};
}

module.exports = ClickHandler;
