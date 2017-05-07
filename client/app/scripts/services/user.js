'use strict';

/**
 * @ngdoc service
 * @name clientApp.user
 * @description
 * # user
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('userService', function ($http, jwtHelper, config, authManager) {
    this.getUser = () => {
      var token = localStorage.getItem('scheduetToken');
      var payload = jwtHelper.decodeToken(token);
      return $http.get(config.serverUrl + `/api/users/${payload.username}`)
        .then(res => res.data, res => res.data);
    };

    this.loggedIn = function() {
    	return authManager.isAuthenticated();
    };
  });
