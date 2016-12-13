(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreatePatternCtrl', CreatePatternCtrl);

	CreatePatternCtrl.$inject = ['apiService', '$scope', '$state'];

	function CreatePatternCtrl(apiService, $scope, $state) {

		var vm = this;
		$scope.body = {};


		$scope.createPattern = () => {
			console.log($scope.body);
			apiService.post('experience/create', $scope.body)

			.then((data) => {
				$state.reload();
				console.log(data);
			});
		}

	}
}());
