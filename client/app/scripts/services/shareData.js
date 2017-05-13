'use strict';

/**
 * @ngdoc service
 * @name clientApp.shareData
 * @description
 * # share data between controllers
 * Service in the clientApp.
 */

angular.module('clientApp')
  .service('shareData', function ($http, jwtHelper, config) {
    var data = {
        modifyingEvent: null
    }
    return {
        getModifyingEvent: function() {
            return data.modifyingEvent;
        },
        setModifyingEvent: function(event) {
            data.modifyingEvent = event;
        },
    }  
  });
