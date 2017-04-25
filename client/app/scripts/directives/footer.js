'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:footer
 * @description
 * # footer
 */
angular.module('app.footer', [])
  .directive('footer', function () {
    return {
      templateUrl: '../views/footer.html',
      restrict: 'E',
      controller: function() {
      }
    };
  });
