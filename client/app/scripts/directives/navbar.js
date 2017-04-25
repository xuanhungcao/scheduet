'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:navbar
 * @description
 * # navbar
 */

angular.module('app.navbar', [])
  .directive('navbar', function () {
    return {
      templateUrl: '../views/navbar.html',
      restrict: 'E',
      controller: function($scope, $uibModal) {
        $scope.openLogin = () => {

        }
      }
    };
  });
