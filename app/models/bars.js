'use strict';

var db = require('./model.js');

var UserFunctions = {
    insertUserGoingToBar: function(req, callback) {
        console.log('Inside the method of bars.js');
        db.get().collection('bars').find({
            barID: req.body.button
        }).toArray(function(err, doc) {
            if (err) {
                throw err;
            }
            if (doc.length > 0) {
                console.log('This document already exists for this bar');
                console.log(doc);
                console.log('-----------------------------------------------');
                //Need to add code to add extra user over here for when the document already exists
                callback(null, doc);
            }
            else {
                console.log('Trying to insert a new document');
                console.log(req.body.profileUser[0].facebookID);
                db.get().collection('bars').update({
                    barID: req.body.button,
                }, {
                    $addToSet: {
                        usersfbID: req.body.profileUser[0].facebookID
                    }
                },{
                    upsert:true
                }, function(err, doc) {
                    if (err) {
                        throw err;
                    }
                    if (doc) {
                        console.log('Had to create a new document for this bar');
                        //callback(null, doc);
                    }
                });
            }
        });
    }

};

module.exports = UserFunctions;