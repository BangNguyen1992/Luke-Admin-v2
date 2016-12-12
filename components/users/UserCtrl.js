(function () {

	'use strict';

	angular
		.module('app')
		.controller('UserCtrl', UserCtrl);

	UserCtrl.$inject = ['apiService', '$scope', '$state'];

	function UserCtrl(apiService, $scope, $state) {
		var vm = this;

		getAllUser();

		$scope.users = [];
// fetch all the users including admins and super admins
		function getAllUser() {
			apiService.get('user/get-all')
				.then(function (data) {
					$scope.users = data;

					var getRole = data.map(user => {
						apiService.get("user/roles?id=" + user.id)
							.then(role => {
								user.roles = role.toString();
							});
					});
				});
		}

//changes the role of a user with the passed id when banned or unbanned
		$scope.changeRole = function (id) {
			apiService.get("user/roles?id=" + id)
				.then(role => {
					$scope.users.roles = role.toString();
					$scope.users.id = id;

					if (role.indexOf("ban") > -1) {
						unban(id);
					} else {
						ban(id);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

// unbanns a bann user
		var unban = function (id) {
			apiService.get("user/unban?id=" + id)
				.then((role) => {
					$scope.users.roles = role;
					console.log("Unbanned ", role, id);
					$state.reload(this);
				})
		}

// bans a user 
		var ban = function (id) {
			apiService.get("user/ban?id=" + id)
				.then((role) => {
					$scope.users.roles = role;
					console.log("Banned ", role, id);
					$state.reload(this);
				})
		}

		$scope.saveUser = function (event) {
			event.preventDefault();
		};
		$scope.sortType = ''; // set the default sort type
		$scope.sortReverse = false; // set the default sort order

		$scope.totalDisplayed = 10;
		$scope.loadMore = function () {
			$scope.totalDisplayed += 10;
		};


	}

}());
