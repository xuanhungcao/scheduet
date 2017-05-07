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
    textColor: 'white'
},
{
    title: 'Phân tích thiết kế hướng đối tượng',
    start: Date.now() + 17*24*60*60*1000,
    end: Date.now() + 17*24*60*60*1000 + 60*60*1000,
    color: 'blue',
    textColor: 'white'
}];

angular.module('app.calendar')
  .controller('CalendarCtrl', function ($scope, $compile, $window, $uibModal, eventService, shareData, userService) {
    if (!userService.loggedIn()) {
        $scope.eventSources.push(sampleEvents);
    } else {
        eventService.getEvents(function(err, res) {
            if (err) {
                console.log(err);
                $scope.events = [];
            } else {
                // RESTORE AFTER DEBUG!!
                // $scope.events = res.data;
                // $scope.eventSources.push($scope.events);
                //
            }
        });
    }

    //DEBUG
    $scope.eventSources = [sampleEvents];
    $scope.currentEvent = sampleEvents[0];
    $scope.events = sampleEvents;
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
        eventRender: $scope.eventOnRender
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
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
        }, function() {
        });
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
