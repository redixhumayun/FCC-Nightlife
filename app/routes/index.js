'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	//this function checks to see whether the user has been logged in and authenticated
	function isLoggedIn (req, res, next) {
		console.log('Inside the isLoggedIn function');
		console.log(req.user);
		console.log('------------------------------------');
		if (req.isAuthenticated()) {
			console.log('User is authenticated');
			return next();
		} else {
			console.log('User is not authenticated and this is from the isLoggedIn function');
			console.log('---------------------');
			res.send('User is not authenticated'); //might need to change this to res.redirect('/login')
		}
	}

	var clickHandler = new ClickHandler();
	
	//this route is for the root page 
	app.route('/')
		.get(function(req, res){
			res.render(path+'/public/rootPage.jade');
		})
		
		.post(function(req, res){
			clickHandler.yelpRequest(req, res, function(data){
				console.log("in the post route of the root page");
				var dataReturn = {};
				dataReturn.businesses = data.businesses;
				res.json(dataReturn); //returns to the makeHTTPRequest function in rootPage.js
			});
		});
	
	//this route is for when the user clicks one of the buttons to signify that they are going to a specific bar
	app.route('/going-to')
		.get(isLoggedIn ,function(req, res){
			
		});
	
	//the post route for the same	
	app.route('/going-to')
		.post(isLoggedIn ,function(req, res){
			req.body.profileUser = req.user;
			console.log('This is from the /going-to route POST');

			clickHandler.addGoingToBar(req, function(data){
				console.log('This has returned to the /going-to POST route');
				console.log(data.value);
				res.json(data.value);
			});
		});
		
	app.route('/update-buttons')
		.post(function(req,res){
			console.log(req.body);
			clickHandler.findAllInsertedBars(req, function(data){
				res.json(data);	
			});
		});

	app.route('/login')
		.get(function (req, res) {
			res.render(path+'/public/login.jade');
		});

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', {scope: 'email'}));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

};
