(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateMarkerCtrl', CreateMarkerCtrl);

	CreateMarkerCtrl.$inject = ['apiService', '$scope', '$state'];

	function CreateMarkerCtrl(apiService, $scope, $state) {

		var vm = this;
		$scope.body = {};


		$scope.createPattern = () => {
			console.log($scope.body);
		
			apiService.post('marker/create', $scope.body)

			.then((data) => {
				console.log(data);
				$state.reload();
			});
		}
		
	}
}());
