(function () {

	'use strict';

	angular
		.module('app', [
		'auth0.lock',
		'angular-jwt',
		'ui.router',
		'ui.bootstrap'
	])
		.config(config);

	config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

	function config($stateProvider, lockProvider, $urlRouterProvider, $http) {

		$stateProvider
			.state('home', {
				url: '/home',
				controller: 'HomeCtrl',
				templateUrl: 'components/home/home.html',
				controllerAs: 'vm'
			})
			.state('login', {
				url: '/login',
				controller: 'LoginCtrl',
				templateUrl: 'components/login/login.html',
				controllerAs: 'vm'
			})
			.state('exp', {
				url: '/exp',
				views: {
					'': {
						templateUrl: 'components/exp/pattern.html',
						controller: 'PatternCtrl',
						controllerAs: 'vm'
					},
					'create@exp': {
						templateUrl: 'components/exp/createPattern.html',
						controller: 'CreatePatternCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('submission', {
				url: '/submission',
				views: {
					'': {
						templateUrl: 'components/submission/submission.html',
						controller: 'SubmissionCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('adminMarker', {
				url: '/marker',
				views: {
					'': {
						templateUrl: 'components/marker/createMarker.html',
						controller: 'CreateMarkerCtrl',
						controllerAs: 'vm'
					},
					'getMarker@adminMarker': {
						templateUrl: 'components/marker/getMarker.html',
						controller: 'GetMarkerCtrl',
						controllerAs: 'vm'
					}
				}
			})

		.state('table', {
				url: '/table',
				templateUrl: 'components/table/tables.html'
			})
			.state('userDetail', {
				url: '/user-detail',
				templateUrl: 'components/userDetail/userDetail.html'
			});


		lockProvider.init({
			clientID: "PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6",
			domain: "nikitak.eu.auth0.com"
		});



		$urlRouterProvider.otherwise('/home');
	}

})();