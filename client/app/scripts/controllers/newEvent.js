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

angular.module('app.calendar')
  .controller('NewEventCtrl', function ($scope, $uibModalInstance) {
    $scope.colors = ['aqua', 'blue', 'teal', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 
    'navy'];

    $scope.color = colorMap['purple'];
    $scope.startDatePickerOpened = false;
    $scope.endDatePickerOpened = false;

  	$scope.newEvent = {
  		textColor: 'white',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      color: $scope.color,
      repeat: []
  	}

    $scope.addEvent = function() {
      if ($scope.eventForm.$valid)
    	 $uibModalInstance.close($scope.newEvent);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }

    $scope.toggleStartDatePicker = function() {
      $scope.startDatePickerOpened = !$scope.startDatePickerOpened;
    }

    $scope.toggleEndDatePicker = function() {
      $scope.endDatePickerOpened = !$scope.endDatePickerOpened;
    }

    $scope.changeColor = function(color) {
      $scope.color = colorMap[color];
      $scope.newEvent.color = $scope.color;
    }
  });
