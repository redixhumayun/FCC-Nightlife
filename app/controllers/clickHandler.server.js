'use strict';

var yelp = require('../models/yelp.js');
var bars = require('../models/users.js');

function ClickHandler () {

	//calls the yelp api through yelp-node in the yelp.js file
	this.yelpRequest = function(req, res, callback){
		console.log(req.body);
		yelp.search(req.body.text, function(data){
			callback(data);
		});
	}, 
	
	this.addGoingToBar = function(req, callback){
		
	};

	// this.getClicks = function (req, res) {
	// 	Users
	// 		.findOne({ 'github.id': req.user.github.id }, { '_id': false })
	// 		.exec(function (err, result) {
	// 			if (err) { throw err; }

	// 			res.json(result.nbrClicks);
	// 		});
	// };

	// this.addClick = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };

	// this.resetClicks = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };

}

module.exports = ClickHandler;
