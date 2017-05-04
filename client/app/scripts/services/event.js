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
    		callback(null, res.data);
    	}, function(err) {
    		callback(err);
    	});
    };
  });
