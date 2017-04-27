'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:calendar
 * @description
 * # calendar
 */

angular.module('app.calendar', ['ui.router', 'ui.calendar'])
.directive('calendar', function () {
    return {
        templateUrl: 'views/calendar.html',
        restrict: 'E',
        controller: 'CalendarCtrl'
    }
})
.config(function($stateProvider) {
  	$stateProvider.state('calendar', {
  		url: '/',
  		template: '<calendar></calendar>'
  	})
});
