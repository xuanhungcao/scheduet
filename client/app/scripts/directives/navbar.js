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
      controller: function($scope, $uibModal, $window, userService) {
        // Get current user
        if (localStorage.getItem('scheduetToken') != null) {
          userService.getUser().then(data => {
            $scope.user = data;
          });
        }

        $scope.openLogin = () => {
          $uibModal.open({
            controller: 'AuthenticationCtrl as AuthenticationCtrl',
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
