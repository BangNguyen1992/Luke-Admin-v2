(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreatePatternCtrl', CreatePatternCtrl);

	CreatePatternCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function CreatePatternCtrl(authService, apiService, $scope, $state) {

		var vm = this;
		vm.authService = authService;
		$scope.body = {};

		activate();
		
		function activate() {
			apiService.get('experience')
				.then(function (data) {
					vm.datas = data;
				});
		}

		$scope.createPattern = function () {
			console.log($scope.body);
		
			apiService.post('experience/create', $scope.body)

			.then(function (data) {
				console.log(data);
			});
		}
		
	}
}());