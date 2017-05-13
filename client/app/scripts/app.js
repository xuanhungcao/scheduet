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
 A module uses a directive with template (view) and controller (controller)
 */

angular.module('clientApp',
		['app.navbar',
		'app.footer',
		'app.calendar',
		'angular-jwt',
		'ui.router',
		'ui.bootstrap',
		'ui.calendar',
      	'ngAvatar'])
	.constant('config', {
		// serverUrl: 'http://localhost:3000',
		// whiteListedDomains: 'localhost',
		serverUrl: 'http://34.223.248.208:3000',
		whiteListedDomains: '34.223.248'
	})
	.config(function($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtOptionsProvider, config) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		jwtOptionsProvider.config({
			authPrefix: 'JWT ',
			tokenGetter: function() {
				return localStorage.getItem('scheduetToken');
			},
			whiteListedDomains: [config.whiteListedDomains],
			unauthenticatedRedirectPath: '/'
		});

		$httpProvider.interceptors.push('jwtInterceptor');
	})
	.run(function(authManager) {
		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();
	});
