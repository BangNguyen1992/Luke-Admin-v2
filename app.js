(function () {

	'use strict';

	angular
		.module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
		.config(config);

	config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

	function config($stateProvider, lockProvider, $urlRouterProvider, $http) {

		$stateProvider
			.state('home', {
				url: '/home',
				controller: 'HomeController',
				templateUrl: 'components/home/home.html',
				controllerAs: 'vm'
			})
			.state('login', {
				url: '/login',
				controller: 'LoginController',
				templateUrl: 'components/login/login.html',
				controllerAs: 'vm'
			})
			.state('exp',{
			url:'/exp',
//			controller:'EXPCtrl',
			templateUrl: 'components/exp/exp.html'
		})
			.state('test',{
			url:'/test',
			
			templateUrl: 'components/test/test.html'
		})
		
		;


//		var clientID = "";
//		var domain = "";
//
//		function getAuth($http) {
//			$http.get("http://www.balticapp.fi/lukeA/authzero").then(function (result) {
//				this.clientID = result.AUTH0_CLIENT_ID;
//				this.domain = result.AUTH0_DOMAIN;
//			})
//		};
//		getAuth();
		
		lockProvider.init({
			clientID: "PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6",
			domain: "nikitak.eu.auth0.com"
		});



		$urlRouterProvider.otherwise('/home');
	}

})();