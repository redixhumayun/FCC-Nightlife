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
            
            //This if statement means that the document already exists for this bar and a new document does not need to be added
            if (doc.length > 0) {
                console.log('This document already exists for this bar');
                console.log('-----------------------------------------------');
                //This function will add a new user to the bar document that already exists 
                addNewUserToBar(req, function(err, doc) {
                    if(err){
                        throw err;
                    }if(doc){
                        console.log('Updated the document successfully');
                        callback(null, doc);
                    }
                });
            }
            //This else statement is executed when a document does not exist for the bar and a new document needs to be added. 
            else {
                console.log('Trying to insert a new document');
                //Calling this function here to insert a new document for this bar! Refactor this to make addNewDocBar use findAndModify
                addNewDocBar(req, function(err, doc) {
                    if (err) {
                        throw err;
                    }
                    if (doc) {
                        //This only returns a writeConcern object, so another MongoDB query needs to be performed. 
                        console.log('Document inserted successfully');
                        //Query to get back details of the document just inserted
                        getBarDetails(req, function(err, doc) {
                            if (err) {
                                throw err;
                            }
                            if (doc) {
                                console.log('Got back document details successfully!');
                                console.log(doc);
                            }
                        });
                    }
                });

            }
        });
    }

};

function addNewUserToBar(req, callback) {
    db.get().collection('bars').findAndModify({
        "barID": req.body.button
    }, [
        ["barID", 1]
    ], {
        "$addToSet": {
            "usersfbID": req.body.profileUser[0].facebookID,
            "usersDocID": req.body.profileUser[0]._id
        }
    }, {
        "new": true
    }, function(err, doc) {
        if (err) {
            callback(err, null);
        }
        if (doc) {
            console.log('Existing document updated successfully');
            callback(null, doc);
        }
    });
}

//This function only returns the writeConcern object
function addNewDocBar(req, callback) {
    db.get().collection('bars').update({
        barID: req.body.button,
    }, {
        $addToSet: {
            usersfbID: req.body.profileUser[0].facebookID,
            usersDocID: req.body.profileUser[0]._id
        }
    }, {
        upsert: true
    }, function(err, doc) {
        if (err) {
            console.log('There is an error here');
            throw err;
        }
        if (doc) {
            console.log('Had to create a new document for this bar');
            callback(null, doc);
        }
    });
}

//This function queries the document inserted immediately prior to this
function getBarDetails(req, callback) {
    db.get().collection('bars').findOne({
        barID: req.body.button
    }, function(err, doc) {
        if (err) {
            callback(err, null);
        }
        if (doc) {
            callback(null, doc);
        }
    });
}

module.exports = UserFunctions;