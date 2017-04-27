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
        title: 'Dinner with Ngoc Trinh',
        start: '2017-04-20T19:00:00',
        color: '#9723d1',
        textColor: 'white'
    }, {
        title: 'Travel to Hawai',
        start: '2017-04-30',
        end: '2017-05-02',
        color: '##22e265',
        textColor: 'white'
    },{
        title: 'Deadline Todo 4',
        start: '2017-04-28',
        color: '#f22e2e',
        textColor: 'white'
    }, {
        title: 'International Labour Day',
        start: '2017-05-01',
        color: '#46eaa6',
        textColor: 'white'
    },{
        title: 'April Fool Day',
        start: '2017-04-01',
        color: '#54f229',
        textColor: 'white'
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
