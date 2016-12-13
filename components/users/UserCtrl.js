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
				.then((data) => {
					$scope.users = data;

					var getRole = data.map(user => {
						apiService.get("user/roles?id=" + user.id)
							.then(role => {
								user.roles = role.toString();
							});
					});
				});
		}

		$scope.changeRole = (id) => {
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

		var unban = (id) => {
			apiService.get("user/unban?id=" + id)
				.then((role) => {
					$scope.users.roles = role;
					console.log("Unbanned ", role, id);
					$state.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}

		var ban = (id) => {
			apiService.get("user/ban?id=" + id)
				.then((role) => {
					$scope.users.roles = role;
					console.log("Banned ", role, id);
					$state.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}

		$scope.saveUser = (event) => {
			event.preventDefault();
		};
		$scope.sortType = ''; // set the default sort type
		$scope.sortReverse = true; // set the default sort order

		$scope.totalDisplayed = 10;
		$scope.loadMore = () => {
			$scope.totalDisplayed += 10;
		};


	}

}());
