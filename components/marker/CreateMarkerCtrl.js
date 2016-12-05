(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateMarkerCtrl', CreateMarkerCtrl);

	CreateMarkerCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function CreateMarkerCtrl(authService, apiService, $scope, $state) {

		var vm = this;
		vm.authService = authService;
		$scope.body = {};

//		activate();
//		
//		function activate() {
//			apiService.get('marker')
//				.then(function (data) {
//					vm.datas = data;
//				console.log(data);
//				});
//		}

		$scope.createPattern = function () {
			console.log($scope.body);
		
			apiService.post('marker/create', $scope.body)

			.then(function (data) {
				console.log(data);
				$state.reload(this);
			});
		}
		
	}
}());