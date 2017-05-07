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
    textColor: 'white',
    repeat: []
}];

angular.module('app.calendar')
  .controller('CalendarCtrl', function ($scope, $window, $uibModal, eventService, userService) {
    $scope.eventSources = [];
    var reformat = function(events) {
        events.forEach(function(event) {
            event.start = new Date(parseInt(event.start, 10));
            event.end = new Date(parseInt(event.end, 10));
            if (event.repeat.length) {
                event.endRepeat = new Date(parseInt(event.endRepeat, 10));
                event.startRepeat = event.start;
                if (event.repeat.length) {
                    // event.repeat = event.repeat[0];
                    event.repeat[0]--;
                }
                event.dow = event.repeat;
            }
            
        });
    };
    if (!userService.loggedIn()) {
        console.log('Add sample events');
        $scope.eventSources.push(sampleEvents);
    } else {
        eventService.getEvents(function(err, res) {
            if (err) {
                alert('Error loading event');
                console.log('Error loading event', err);
                $scope.events = [];
            } else {
                console.log('Successful loading event', res);
                $scope.events = res.data;
                reformat($scope.events);
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
        eventClick: $scope.eventOnClick,
        eventRender: function(event, element, view) {
            if (event.repeat.length == 0)
                return true;
            return event.start <= event.endRepeat && event.start >= event.startRepeat;
        }
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
            $scope.events.push(newEvent);
            eventService.createEvent(newEvent, function(err, res) {
                if (err) {
                    alert('Error creating your event');
                    console.log('Error creating events', err);
                } else {
                    console.log('Successful creating event');
                }
            });
        }, function() {
        });
    };
  });
