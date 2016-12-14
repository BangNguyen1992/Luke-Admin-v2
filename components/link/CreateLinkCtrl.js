(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateLinkCtrl', CreateLinkCtrl);

	CreateLinkCtrl.$inject = ['apiService', '$scope', '$state'];

	function CreateLinkCtrl(apiService, $scope, $state) {
		var vm = this;
		$scope.body = { };

		$scope.createLink = () => {
			apiService.post('link/create', $scope.body)
				.then(data => {
				$state.reload();
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		$scope.updateLink = () => {
			apiService.post('link/update', $scope.body)
				.then(data => {
					$state.reload();
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

	}

}());
