'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CalendarctrlCtrl
 * @description
 * # CalendarctrlCtrl
 * Controller of the clientApp
 */
angular.module('app.calendar')
  .controller('CalendarCtrl', function ($scope, $uibModal) {
    $scope.events = [{
        title: 'Event 1',
        start: '2017-04-20',
        color: 'pink',
        textColor: 'white',
        description: '1'
    }, {
        title: 'Event 2',
        start: '2017-04-29',
        color: 'pink',
        textColor: 'white',
        description: '2'
    }];

    $scope.eventSources = [$scope.events];

    $scope.eventOnClick = function(_event, eventJs, view) {
        $scope.currentEvent = $scope.events.find(function(event) {
            return _event._id == event._id
        });
    }

    $scope.uiConfig = {
        aspectRatio: 2,
        editable: true,
        header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next myButton'
        },
        eventClick: $scope.eventOnClick
    }

    $scope.createEvent = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/newEvent.html',
            controller: 'NewEventCtrl'
        });
        modalInstance.result.then(function(newEvent) {
            console.log(newEvent);
            $scope.events.push(newEvent);
        })
    }

  });
