'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:calendar
 * @description
 * # calendar
 */

function CalendarCtrl($scope) {
    $scope.events = [{
        title: 'event1',
        start: '2017-04-20',
        color: 'red',
        textColor: 'white'
    }, {
        title: 'event2',
        start: '2017-04-29',
        color: 'pink',
        textColor: 'blue'
    }];

    $scope.eventSources = [$scope.events];

    $scope.eventOnClick = function(_event, eventJs, view) {
        $scope.currentEvent = $scope.events.find(function(event) {
            return _event._id == event._id
        });
    }

    $scope.uiConfig = {
        height: 450,
        editable: true,
        header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next myButton'
        },
        eventClick: $scope.eventOnClick
    }
}

angular.module('app.calendar', ['ui.router', 'ui.calendar'])
.directive('calendar', function () {
    return {
        templateUrl: '../views/calendar.html',
        restrict: 'E',
        controller: CalendarCtrl
    }
})
.config(function($stateProvider) {
  	$stateProvider.state('calendar', {
  		url: '/',
  		template: '<calendar></calendar>'
  	})
});
