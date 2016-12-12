(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateCategoryCtrl', CreateCategoryCtrl);

	CreateCategoryCtrl.$inject = ['apiService', '$scope', '$state'];

	function CreateCategoryCtrl(apiService, $scope, $state) {
		var vm = this;
		//		vm.authService = authService;
		$scope.body = {
			title: "",
			description: "",
			position: Boolean,
			image: File
		};

		$scope.createCategory = function () {
			$scope.body.image = $scope.body.image.base64;
			apiService.post('category/create', $scope.body)
				.then(data => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});

		}

	}

}());
