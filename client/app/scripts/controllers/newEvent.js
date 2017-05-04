'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the new event
 */
angular.module('app.calendar')
  .controller('NewEventCtrl', function ($scope, $uibModalInstance) {
  	$scope.newEvent = {
  		color: '#605ca8',
  		start: new Date(),
  		textColor: 'white'
  	}
    $scope.addEvent = function() {
    	$uibModalInstance.close($scope.newEvent)
    }
  });
