'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
 
/* 
	Each dependency module represents a component of the app
	A module use a directive with template (view) and controller (controller)
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
