(function () {

	'use strict';

	angular
		.module('app')
		.controller('UserCtrl', UserCtrl);

	UserCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function UserCtrl(authService, apiService, $scope, $state) {
		var vm = this;
		vm.authService = authService;

		getAllUser();

		$scope.users = [];

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


		var unban = function (id) {
			apiService.get("user/unban?id=" + id)
				.then((role) => {
					$scope.users.roles = role;
					console.log("Unbanned ", role, id);
					$state.reload(this);
				})
		}


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
