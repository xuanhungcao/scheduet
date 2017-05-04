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
    	var token = localStorage.getItem('scheduetToken');

    	var getConfig = {
    		header : {
    			Authorization: 'JWT ' + token
    		}
    	};

    	$http.get(config.serverUrl + '/api/events', getConfig)
    	.then(function(res) {
    		callback(null, res);
    	}, function(err) {
    		callback(err);
    	});
    };

    this.createEvent = function(event, callback) {
        var token = localStorage.getItem('scheduetToken');
        var postConfig = {
            header : {
                Authorization: 'JWT ' + token
            }
        };

        $http.post(config.serverUrl + '/api/events', event, postConfig)
        .then(function(res) {
            callback(null, res);
        }, function(err) {
            callback(err);
        })
    }
  });
