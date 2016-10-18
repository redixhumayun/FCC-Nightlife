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
                //This function will check to see whether the user already exists within that bar. If user exists, remove user and return with callback
                checkIfUserExistsInBar(req, function(err, doc) {
                    if (err) {
                        throw err;
                    }
                    if (doc !== null) {
                        console.log('Successfully removed this user from the bar');
                        callback(null, doc);
                    }
                    else {
                        addNewUserToBar(req, function(err, doc) {
                            if (err) {
                                throw err;
                            }
                            if (doc) {
                                console.log('Updated the document successfully and added a new user');
                                callback(null, doc);
                            }
                        });
                    }
                });
                //This function will add a new user to the bar document that already exists 


            }
            //This else statement is executed when a document does not exist for the bar and a new document needs to be added. 
            else {
                console.log('Trying to insert a new document');
                //Refactored to findAndModify so that it returns the new inserted document
                addNewDocBar(req, function(err, doc) {
                    if (err) {
                        throw err;
                    }
                    if (doc) {
                        console.log('Document inserted successfully');
                        console.log(doc);
                        callback(null, doc);
                    }
                });

            }
        });
    },
    findAllInsertedBars: function(req, callback) {
        db.get().collection('bars').find({
            barID: req.body.button
        }).toArray(function(err, doc) {
            if (err) {
                callback(err);
            }
            if (doc) {
                callback(null, doc);
            }
        });
    }

};

//This function is used to check if the user already exists in the bar. If he/she does, they are removed!
function checkIfUserExistsInBar(req, callback) {
    db.get().collection("bars").findAndModify({
        "barID": req.body.button,
        "usersfbID": req.body.profileUser[0].facebookID
    }, [
        ["barID", 1]
    ], {
        "$pull": {
            "usersfbID": req.body.profileUser[0].facebookID,
            "usersDocID": req.body.profileUser[0]._id
        }
    }, {
        "new": true
    }, function(err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            console.log("Removed the user from the bar");
            console.log(doc);
            callback(null, doc);
        }
        else {
            console.log('Cannot find document');
        }
    });
}

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

//This function only returns the writeConcern object. Change this to findAndModify
function addNewDocBar(req, callback) {
    db.get().collection('bars').findAndModify({
        "barID": req.body.button,
    }, [
        ["barID", 1]
    ], {
        "$addToSet": {
            "usersfbID": req.body.profileUser[0].facebookID,
            "usersDocID": req.body.profileUser[0]._id
        }
    }, {
        "new": true,
        "upsert": true
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


module.exports = UserFunctions;