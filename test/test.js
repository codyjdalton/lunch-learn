"use strict";

// include vendor dependencies
var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('request');

var baseUrl = 'http://localhost:3000';

describe('Our Test App', function(){
    describe('when requested at /hello', function(){
        it('should respond with a JSON object saying hello', function(done){
            request(baseUrl + "/hello", function(err, response, body){
                expect(err).to.not.be.ok;
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)).to.have.property('message', 'hello world');
                done();
            });
        });
    });
    describe('when requested at /api/people', function(){
        it('should respond with an array of people objects', function(done){
            request(baseUrl + "/api/people", function (err, response, body) {

                var result = JSON.parse(body);
                
                expect(err).to.not.be.ok;
                expect(response.statusCode).to.equal(200);
                expect(result).to.be.an('array');

                // if there are results, test the first one
                if (result[0]) { 
                    expect(result[0]).to.be.an('object');
                    expect(result[0]).to.have.property('uuid');
                }
                done();
            });
        });
    });
});

