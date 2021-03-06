'use strict';

//using this file to set up the initial mongo connection
//Returns the state object containing the db object 
var mongo = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function(url, done){
    if(state.db){
        return done();
    }
    mongo.connect(url, function(err, db){
       if(err){
           return done(err);
       } 
       state.db = db;
       done();
    });
};

exports.get = function(){
    return state.db;
};

exports.close = function(done){
    if(state.db){
        state.db.close(function(err, result){
           state.db = null;
           state.mode = null;
           done(err);
        });
    }
};

