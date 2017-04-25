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
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: function($scope, $uibModal, $window) {
        $scope.openLogin = () => {
          $uibModal.open({
            controller: 'LoginCtrl as LoginCtrl',
            templateUrl: 'views/login.html'
          });
        };

        $scope.logout = () => {
          localStorage.removeItem('scheduetToken');
          $window.location.reload()
        }
      }
    };
  });
