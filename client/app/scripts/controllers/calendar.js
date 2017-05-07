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
    end: Date.now() + 60*60*1000,
    color: '#9723d1',
    repeat: []
},
{
    title: 'Phân tích thiết kế hướng đối tượng',
    start: Date.now() + 17*24*60*60*1000,
    end: Date.now() + 17*24*60*60*1000 + 60*60*1000,
    color: 'blue',
    repeat: []
}];


angular.module('app.calendar')
  .controller('CalendarCtrl', 
    function ($scope, $window, $uibModal, $compile, eventService, userService, shareData) {
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
                //RESTORE AFTER DEBUG!!!
                $scope.events = res.data;
                reformat($scope.events);
                $scope.eventSources.push($scope.events);
            }
        });
    }

    //DEBUG
    // $scope.eventSources = [sampleEvents];
    // $scope.currentEvent = sampleEvents[0];
    // $scope.events = sampleEvents;
    //

    $scope.eventOnClick = function(_event, eventJs, view) {
        $scope.currentEvent = $scope.events.find(function(event) {
            return _event._id === event._id;
        });
    };

    $scope.eventOnRender = function(_event, element, view) {
        element.attr({
            'id': "eventNo" + _event._id,
            'uib-popover-template': "'views/eventDetail.html'",
            'popover-trigger': "'outsideClick'",
            'popover-append-to-body': true,
            // 'popover-toggle': '',
            'popover-placement': "auto"
        });
        $compile(element)($scope);
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
            console.log('lulz');
            $scope.eventOnRender(event, element, view);
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

    $scope.replace = function(events, oldEvent, newEvent){
        console.log($scope.events.length);
        // newEvent._id = oldEvent._id;
        for (var i = 0; i < $scope.events.length; i++)
            if ($scope.events[i]._id == oldEvent._id){
                $scope.events.splice(i,1);
            }
        $scope.events.push(newEvent);
        console.log($scope.events);
    };

    $scope.modifyEvent = function() {
        var popover = $('.popover');
        popover.html('');
        $compile(popover)($scope);

        //indicate the modal: currently modifying an event
        shareData.setModifyingEvent($scope.currentEvent);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/newEvent.html',
            controller: 'NewEventCtrl'
        });
        modalInstance.result.then(function(modifiedEvent) {
            $scope.replace($scope.events, $scope.currentEvent, modifiedEvent);

            // $scope.events.push(modifiedEvent);
            
            // $scope.events.push(newEvent);
            // eventService.createEvent(newEvent, function(err, res) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(res);
            //     }
            // });
        }, function() {
            //turn off modify mode
            shareData.setModifyingEvent(null);
        });
    };
  });
