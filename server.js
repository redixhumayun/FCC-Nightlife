'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var db = require('./app/models/model.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('dotenv').load();
require('./app/config/passport')(passport);

db.connect(process.env.MONGO_URI, function(err){
	if(err){
		console.log('Unable to connect to Mongo');
		throw err;
	}else{
		console.log('Successfully connected to MongoDB');
	}
});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/models', express.static(process.cwd()+ '/app/models'));


app.use(session({
	secret: 'fccnightlife',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({url: process.env.MONGO_URI})
}));

app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});