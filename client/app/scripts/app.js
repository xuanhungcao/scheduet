'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
 
angular
  .module('clientApp', 
  	['app.navbar', 
  	'app.footer',
  	'app.calendar',
  	'ui.router'])
  .config(function($locationProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
});
