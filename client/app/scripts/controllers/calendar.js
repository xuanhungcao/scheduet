'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CalendarctrlCtrl
 * @description
 * # CalendarCtrl
 * Controller of the clientApp
 */

const sampleEvents = [{
    title: 'Sample Event',
    start: Date.now(),
    color: '#9723d1',
    textColor: 'white'
}];

angular.module('app.calendar')
  .controller('CalendarCtrl', function ($scope, $uibModal, eventService, userService) {
    $scope.eventSources = [];

    if (!userService.loggedIn()) {
        $scope.eventSources.push(sampleEvents);
    } else {
        eventService.getEvents(function(err, data) {
            if (err) {
                alert(err.data);
                $scope.events = [];
            } else {
                $scope.events = data;
                $scope.eventSources.push($scope.events);
            }
        });
    }

    $scope.eventOnClick = function(_event, eventJs, view) {
        $scope.currentEvent = $scope.events.find(function(event) {
            return _event._id === event._id;
        });
    };

    $scope.uiConfig = {
        aspectRatio: 2,
        editable: false,
        header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next myButton'
        },
        eventClick: $scope.eventOnClick
    };

    $scope.createEvent = function() {
        if (!userService.loggedIn()) {
            alert('Please log in to create an event!');
            return;
        }
        var modalInstance = $uibModal.open({
            templateUrl: 'views/newEvent.html',
            controller: 'NewEventCtrl'
        });
        modalInstance.result.then(function(newEvent) {
            console.log(newEvent);
            $scope.events.push(newEvent);
        });
    };
  });
