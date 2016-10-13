'use strict';

var db = require('./model.js');

//use this file to add all new users to the database. Anytime Facebook login is clicked on this file will be used to document all users
var UserFunctions = {
    //this function findById is specifically for passport.deserializeUser
    findById: function(id, callback){
        db.get().collection('users').find({
            facebookID: id
        }).toArray(function(err, doc){
           if(err){
               throw err;
           } if(doc){
               callback(err, doc);
           }
        });
    }, 
    
    //this function is used to find out whether a user is already registered with facebook on the app. If not, added to the database
    findOne: function(token, refreshToken, profile, callback){
        db.get().collection('users').find({
            facebookID: profile.id
        }).toArray(function(err, doc){
            if(err){
                throw err;
            }
            if(doc.length > 0){
                console.log('This user already exists and we found him!');
                console.log(doc);
                console.log('------------------------------------------');
                return callback(null, doc[0]);
            }else{
                db.get().collection('users').insert({
                    facebookID: profile.id, 
                    facebookUserName: profile.name.givenName + ' ' + profile.name.familyName,
                    facebookToken: token,
                    facebookEmail: profile.emails[0].value
                }, function(err, doc){
                    if(err){
                        throw err;
                    }if(doc){
                        console.log('This user did not exist and we created him');
                        console.log(doc);
                        console.log('------------------------------------------');
                        callback(null, doc.ops[0]);
                    }
                });
            }
        });
    }
};

module.exports = UserFunctions;