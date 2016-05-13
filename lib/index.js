"use strict";

// require vendor dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// require custom dependencies
var people = require('./components/people');

// parse JSON request bodies
app.use(bodyParser.json());

// use /client app as static  
app.use(express.static('client'));

// send people requests to custom /people module
app.use('/api/people', people);

// say hello
app.get('/hello', function(req, res){
    res.json({
        message: 'hello world'
    });
    return;
});

// listen
app.listen((process.env.PORT || 3000));

