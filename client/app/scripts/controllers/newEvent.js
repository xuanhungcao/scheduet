'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the new event
 */
const colorMap = {
  purple: '#605ca8',
  aqua: '#00c0ef',
  blue: '#0073b7',
  black: '#111111',
  green: '#00a65a',
  gray: '#d2d6de',
  yellow: '#f39c12',
  orange: '#ff851b',
  red: '#dd4b39',
  muted: '#7a869d',
  navy: '#001f3f'
};

const dayofWeek = ['sun','mon','tue','wed','thu','fri','sat'];

angular.module('app.calendar')
  .controller('NewEventCtrl', function ($scope, $uibModalInstance, shareData) {
    var formatTime = function(_event){
      var event = Object.assign({
        startDate: _event.start,
        startTime: _event.start,
        endDate: _event.end,
        endTime: _event.end,
        endRepeatDate: _event.endRepeat,
        endRepeatTime: _event.endRepeat,
      }, _event);
      if (_event.isRepeatEvent || _event.repeat.length){
        var repeatDay = [false,false,false,false,false,false,false]
        for (var i = 0; i < event.repeat.length; i ++){
          repeatDay[event.repeat[i]] = true;
        }
        event.repeatDay = repeatDay;
        event.isRepeatEvent = true;
      }
      return event;
    }

    $scope.colors = ['blue', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 
    'navy'];
    $scope.dow = dayofWeek;

    $scope.startDatePickerOpened = false;
    $scope.endDatePickerOpened = false;
    $scope.startRepeatDatePickerOpened = false;
    $scope.endRepeatDatePickerOpened = false;

    $scope.repeat = false;
    $scope.color = colorMap[$scope.colors[0]];
    $scope.title = "Create an event";
    $scope.confirmButton = "Add";

    $scope.newEvent = {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(0),
      endTime: new Date(2*60*60*1000),
      color: $scope.color,
      startRepeat: new Date(0),
      endRepeat: new Date(0),
      // startRepeat = start
      // startRepeatDate: new Date(),
      // startRepeatTime: new Date(0),
      endRepeatTime: new Date(0),
      endRepeatDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isRepeatEvent: false,
      repeatDay: [false,false,false,false,false,false,false]
      // repeat: []
    }
    $scope.newEvent.repeatDay[new Date().getDay()] = true;

    $scope.$watch(
      function() {return shareData.getModifyingEvent()}, 
      function (newValue, oldValue) {
        if (newValue){
          $scope.newEvent = formatTime(newValue);
          $scope.color = newValue.color;
          $scope.title = "Modify event";
          $scope.confirmButton = "Done";
        }
    });

    $scope.addEvent = function() {
      if ($scope.eventForm.$valid)
    	 $uibModalInstance.close($scope.newEvent);
    }

    $scope.cancel = function() {
      shareData.setModifyingEvent(null);
      $uibModalInstance.dismiss();
    }

    $scope.toggleStartDatePicker = function() {
      $scope.startDatePickerOpened = !$scope.startDatePickerOpened;
    }

    $scope.toggleEndDatePicker = function() {
      $scope.endDatePickerOpened = !$scope.endDatePickerOpened;
    }

    $scope.toggle = function(attr) {
      console.log(attr);
      $scope[attr] = !$scope[attr];
    }

    $scope.changeColor = function(color) {
      $scope.color = colorMap[color];
      $scope.newEvent.color = $scope.color;
    }
  });
