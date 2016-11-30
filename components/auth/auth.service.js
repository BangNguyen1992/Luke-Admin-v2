(function () {

	'use strict';

	angular
		.module('app')
		.service('authService', authService);

	authService.$inject = ['lock', 'authManager', '$rootScope'];

	function authService(lock, authManager, $rootScope) {

		$rootScope.$on('$stateChangeStart', function(event, nextRoute) {
      if (nextRoute.controller === 'AdminController') {
        if (!isAdmin()) {
          alert('You are not allowed to see the Admin content');
          return event.preventDefault();
        }
      }
    });
		
		function isAdmin() {
      return userProfile && userProfile.app_metadata
        && userProfile.app_metadata.roles
        && userProfile.app_metadata.roles.indexOf('admin') > -1;
    }
  
		
		function login() {
			lock.show();
		}

		// Logging out just requires removing the user's
		// id_token and profile
		function logout() {
			localStorage.removeItem('id_token');
			authManager.unauthenticate();
		}

		// Set up the logic for when a user authenticates
		// This method is called from app.run.js
		function registerAuthenticationListener() {
			lock.on('authenticated', function (authResult) {
				console.log("OK?");
				localStorage.setItem('id_token', authResult.idToken);
				localStorage.setItem('acstoken', authResult.accessToken);
				localStorage.setItem('payload', authResult.idTokenPayload);
				authManager.authenticate();

				lock.getProfile(authResult.idToken, function (error, profile) {
					localStorage.setItem('profile', JSON.stringify(profile));
					$rootScope.$broadcast('userProfileSet', profile);
				});
			});
		}

		return {
			login: login,
			logout: logout,
			registerAuthenticationListener: registerAuthenticationListener
		}
	}
})();