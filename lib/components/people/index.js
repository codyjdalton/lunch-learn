"use strict";

/**
 * Example of a REST-y web service
 * NOTE: If you would like a challenge, abstract this a bit so each resource is a just schema
 * using the same logic as all other resources.
 */

// include vendor libraries
var router = require('express').Router();
var mongoose = require('mongoose');
var uuid = require('uuid');

// set local mongoose credentials
if (typeof process.env.mongoConnection === 'undefined') {
    process.env.mongoConnection = require('../../../local.json').mongoConnection;
}

// Connect to AWS storage
mongoose.connect(process.env.mongoConnection);

// Define person model
var Person = mongoose.model('Person', mongoose.Schema({
    uuid: String,
    name: String,
    email: String
}));

// PRE route middleware
// runs before any routes are accessed
router.use(function (req, res, next) { 

    // you could add some authentication here
    // ....

    // but we are gonna go ahead and move on to what the client is asking for
    next();
});

// GET /resource route
router.get('/', function(req, res, next){
    Person.find({}, function(err, data){

        // simple error handling
        if (err) next();

        // send resources as response
        res.json(data);
        return;
    });
});

// POST /resource route
router.post('/', function(req, res, next){

    // new person object from model
    var person = new Person(req.body);

    // add UUID
    person.uuid = uuid.v4();

    // store new resource
    person.save(function(err, data){
        if (err) next();
        
        res.json(data);
        return;
    });
});

// POST resource/id
router.post('/:uuid', function(req, res){
    Person.find({ uuid: req.params.uuid}, function(err, data){

        // check resource was found
        if (err || !data[0]) {
            res.status(404).json({
                message: "Unable to find that resource"
            });
            return;
        }

        // add client provided attributes
        for (var key in req.body) {
            if (key !== 'uuid') {
                data[0][key] = req.body[key];
            }
        }

        // save updated resource
        data[0].save(function(err, person){
            res.json(person);
            return;
        });
    });
});

// DELETE resource/id
router.delete('/:uuid', function(req, res, next){
    Person.find({ uuid: req.params.uuid}, function(err, data){
        
        if (err || !data[0]) {
            res.status(404).json({
                message: "Could not find that resource"
            });
            return;
        }
        
        // make the update
        data[0].remove(function (err, data) { 

            if (err) next();
            res.status(204).json({
                message: "Resource was deleted"
            });
        });
    });
});

// POST route middleware
// runs when a route calls next() or if no route was accessed
router.use(function (req, res) {
    // fail gracefully
    res.status(500).json({
        message: "Unable to " + req.method + " " + req.originalUrl
    });
    return;
});

// export our router for any module to use
module.exports = router;

