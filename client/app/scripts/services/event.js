'use strict';

/**
 * @ngdoc service
 * @name clientApp.event
 * @description
 * # event
 * Service in the clientApp.
 */

angular.module('clientApp')
  .service('eventService', function ($http, jwtHelper, config) {
    this.getEvents = function(callback) {
    	$http.get(config.serverUrl + '/api/events')
    	.then(function(res) {
    		callback(null, res);
    	}, function(err) {
    		callback(err);
    	});
    };

    this.createEvent = function(event, callback) {
        $http.post(config.serverUrl + '/api/events', event)
        .then(function(res) {
            callback(null, res);
        }, function(err) {
            callback(err);
        })
    }

    this.modifyEvent = function(event, callback) {
        $http.put(config.serverUrl + '/api/events', event)
        .then(function(res) {
            callback(null, res);
        }, function(err) {
            callback(err);
        })
    }

    this.deleteEvent = function(eventId, callback) {
        $http.delete(config.serverUrl + '/api/events', {params: {_id: eventId}})
        .then(function(res) {
            callback(null, res);
        }, function(err) {
            callback(err);
        })
    }
  });
