"use strict";

var app = angular.module('app', []);

app.controller('PeopleCtrl', function($scope, $http){
    
     // GET people
    $scope.construct = function(){
        $http.get('/api/people')
            .success(function(data){
                $scope.people = data;
            });
    };
    
    // POST people
    $scope.create = function(person){
        $http.post('/api/people', person)
            .success(function(data){
                $scope.construct();
                $scope.newPerson = false;
            });
    };
    
    // DELETE people/id
    $scope.remove = function(person){
        $http.delete('/api/people/' + person.uuid)
            .success(function(data){
                $scope.construct();
            });
    };

    // POST people/id
    $scope.update = function(person){
        $http.post('/api/people/' + person.uuid, person)
            .success(function(data){
                $scope.construct();
            });
    };
    
    $scope.construct();
});