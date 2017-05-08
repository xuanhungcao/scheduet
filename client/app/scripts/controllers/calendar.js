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
    var clientToServerReformat = function(event) {
      event.start = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), 
        event.startDate.getDate(), event.startTime.getHours(), event.startTime.getMinutes()).getTime();
      event.end = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), 
        event.endDate.getDate(), event.endTime.getHours(), event.endTime.getMinutes()).getTime();
    };
    var serverToClientReformat = function(event) {
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
                $scope.events.forEach(function(event) {
                    serverToClientReformat(event);
                });
                $scope.eventSources.push($scope.events);
            }
        });
    }

    $scope.eventOnClick = function(_event, eventJs, view) {
        $scope.currentEvent = $scope.events.find(function(event) {
            return _event._id === event._id;
        });
        // $scope.currentEvent.title ="changed";
        // $scope.currentEvent.color = "red";
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
            console.log(newEvent);
            $scope.events.push(Object.create(newEvent));            
            clientToServerReformat(newEvent);
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

    $scope.replace = function(events, currentEvent, newEvent){
        Object.keys(currentEvent).forEach(function(key) {
            if (key != '_id') 
                currentEvent[key] = newEvent[key];
        });
        currentEvent.title = currentEvent.title + ' ';
        console.log(currentEvent);
        var cloneEvent = Object.assign({},newEvent);
        cloneEvent._id = currentEvent._id;
        console.log(cloneEvent);
        clientToServerReformat(cloneEvent);

        eventService.modifyEvent(cloneEvent, function(err, res) {
                if (err) {
                    alert('Error modify your event');
                    console.log('Error modify events', err);
                } else {
                    console.log('Successful modify event');
                }
            }, function(){});        
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
