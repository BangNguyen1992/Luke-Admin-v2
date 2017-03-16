(function () {

	'use strict';

	angular
		.module('app', [
			'auth0.lock',
			'angular-jwt',
			'ui.router',
			'ui.bootstrap',
			'naif.base64'
		])
		.config(config);


	config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

	function config($stateProvider, lockProvider, $urlRouterProvider) {

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

			.state('user', {
				url: '/user',
				controller: 'UserCtrl',
				templateUrl: 'components/users/user.html',
				controllerAs: 'vm'
			})
			.state('category', {
				url: '/category',
				views: {
					'': {
						templateUrl: 'components/category/createCategory.html',
						controller: 'CreateCategoryCtrl',
						controllerAs: 'vm'
					},
					'getCategory@category': {
						templateUrl: 'components/category/getCategory.html',
						controller: 'GetCategoryCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('link', {
				url: '/link',
				views: {
					'': {
						templateUrl: 'components/link/createLink.html',
						controller: 'CreateLinkCtrl',
						controllerAs: 'vm'
					},
					'getLink@link': {
						templateUrl: 'components/link/getLink.html',
						controller: 'GetLinkCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rank', {
				url: '/rank',
				views: {
					'': {
						templateUrl: 'components/rank/createRank.html',
						controller: 'CreateRankCtrl',
						controllerAs: 'vm'
					},
					'getRank@rank': {
						templateUrl: 'components/rank/getRank.html',
						controller: 'GetRankCtrl',
						controllerAs: 'vm'
					}
				}
			});

		lockProvider.init({
			clientID: AUTH0_CLIENT_ID,
			domain: AUTH0_DOMAIN
		});

		$urlRouterProvider.otherwise('/home');

	}

})();