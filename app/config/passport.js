'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;
var user = require('../models/users.js');
var bars = require('../models/bars.js');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user[0].facebookID);
	});

	passport.deserializeUser(function (id, done) {
		user.findById(id, function (err, user) {
			done(err, user);
		});
	});
	//using the facebook strategy to login the user and serialize their session
	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL, 
		profileFields: ['first_name', 'last_name', 'email', 'gender']
	},
	function (token, refreshToken, profile, done) {
		console.log(profile);
		process.nextTick(function () {
			//calling the user database from here. User database stored is users.js
			user.findOne(token, refreshToken, profile, function(err, user){
				if(err){
					throw err;
				}if(user){
					return done(null, user);
				}
			});
		});
	}));
};
