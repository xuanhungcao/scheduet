'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the app.navbar
 */
angular.module('app.navbar')
  .controller('LoginCtrl', function ($scope, $http, $uibModalInstance, $uibModal, config, $window) {
    $scope.loginData = {
      username: "",
      password: ""
    };
    $scope.errorMsg = null;

    $scope.login = () => {
      $http.post(config.serverUrl + "/login", $scope.loginData)
        .then(res => {
          localStorage.setItem('scheduetToken', res.data.token)
          $scope.errorMsg = null;
          $uibModalInstance.dismiss();
          $window.location.reload();
        }, res => {
          $scope.errorMsg = "Login failed, please check username or password again"
        });
    }
  });
