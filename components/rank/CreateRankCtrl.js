(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateRankCtrl', CreateRankCtrl);

	CreateRankCtrl.$inject = ['apiService', '$scope', '$state'];

	function CreateRankCtrl(apiService, $scope, $state) {
		var vm = this;
		$scope.body = {};

		$scope.createRank = () => {
			$scope.body.image = $scope.body.image.base64;
			apiService.post('rank/create', $scope.body)
				.then(data => {
					$state.reload();
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});

		}

		$scope.updateRank = () => {
			apiService.post('rank/update', $scope.body)
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
