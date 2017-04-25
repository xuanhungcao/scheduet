'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:calendar
 * @description
 * # calendar
 */
const name = 'calendar'

angular.module('app.calendar', ['ui.router'])
  .directive('calendar', function () {
    return {
      templateUrl: '../views/calendar.html',
      restrict: 'E',
      controller: function() {
      	this.text = 'This is calendar view';
      },
      controllerAs: 'calendar'
    }
  })
  .config(function($stateProvider) {
  	$stateProvider.state('calendar', {
  		url: '/',
  		template: '<calendar></calendar>'
  	})
  });
