'use strict';

/**
 * @ngdoc function
 * @name app.navbar.controller:AuthenticationCtrl
 * @description
 * # AuthenticationCtrl
 * Controller of the app.navbar
 */
angular.module('app.navbar')
  .controller('AuthenticationCtrl', function ($scope, $http, $uibModalInstance, $uibModal, config, $window) {
    $scope.loginData = {
      username: "",
      password: ""
    };
    $scope.errorMsg = [];
    $scope.infoMsg = null;

    $scope.registerData = {
      username: "",
      studentId: "",
      password: "",
      password_confirmation: ""
    };

    $scope.openLogin = () => {
      $uibModalInstance.dismiss();
      $uibModal.open({
        controller: 'AuthenticationCtrl as AuthenticationCtrl',
        templateUrl: 'views/login.html'
      });
    };

    $scope.login = () => {
      $http.post(config.serverUrl + "/login", $scope.loginData)
        .then(res => {
          localStorage.setItem('scheduetToken', res.data.token);
          $scope.errorMsg = [];
          $uibModalInstance.dismiss();
          $window.location.reload();
        }, res => {
          $scope.errorMsg = ["Login failed, please check username or password again"]
        });
    };

    $scope.openRegister = () => {
      $uibModalInstance.dismiss();
      $uibModal.open({
        controller: 'AuthenticationCtrl as AuthenticationCtrl',
        templateUrl: 'views/register.html'
      });
    };

    $scope.register = () => {
      console.log($scope.registerData);
      if (!$scope.registerData.username) {
        $scope.errorMsg.push("Username is required");
      }
      if (!$scope.registerData.password) {
        $scope.errorMsg.push("Password is required");
      }
      if ($scope.registerData.password !== $scope.registerData.password_confirmation) {
        $scope.errorMsg.push("Password confirmation does not match, please try again");
      }
      if ($scope.errorMsg.length > 0) return;

      $http.post(config.serverUrl + "/register", $scope.registerData)
        .then(res => {
          $scope.infoMsg = "Register successfully";
          $scope.errorMsg = [];
        }, res => {
          $scope.errorMsg = [res.data.error];
          $scope.infoMsg = null;
        })
    };

  });
