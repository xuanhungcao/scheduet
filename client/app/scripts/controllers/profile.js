'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProfileCtrl', function ($scope, $http, $uibModalInstance, $uibModal, config, $window, userService) {
    console.log($scope.user);
    $scope.profile = {
      username: $scope.user.username,
      studentId: $scope.user.studentId,
      password: "",
      password_confirmation: ""
    };

    $scope.errorMsg = [];
    $scope.infoMsg = null;

    $scope.$watch('profile.password', () => {
      if ($scope.profile.password == "") {
        $scope.profile.password_confirmation = "";
      }
    });

    $scope.updateProfile = () => {
      console.log($scope.profile);
      if (!$scope.profile.password) {
        delete $scope.profile.password;
        delete $scope.profile.password_confirmation;
      }

      if ($scope.profile.password && $scope.profile.password_confirmation != $scope.profile.password) {
        $scope.errorMsg.push("Password confirmation does not match")
      }

      if ($scope.errorMsg.length > 0) return;

      userService.postUser($scope.profile).then(res => {
        $scope.infoMsg = "Update profile successfully";
        $scope.user.studentId = $scope.profile.studentId;
        $scope.errorMsg = [];
      }, res => {
        $scope.errorMsg = [res.data.toUpperCase()];
        $scope.infoMsg = null;
      })
    }

  });
