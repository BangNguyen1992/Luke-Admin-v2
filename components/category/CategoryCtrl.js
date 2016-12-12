(function () {

	'use strict';

	angular
		.module('app')
		.controller('CategoryCtrl', CategoryCtrl);

	CategoryCtrl.$inject = ['apiService', '$scope', '$state'];

	function CategoryCtrl(apiService, $scope, $state) {
		var vm = this;
		//        vm.authService = authService;

		findall();

		function findall() {
			apiService.get('category')
				.then((data) => {
					vm.datas = data;
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		$scope.delete = function (id) {
			console.log(id);
			apiService.get('category/remove?id=' + id)
				.then(function (id) {
					$state.reload(this);
				})
				.catch((err) => {
					console.log(err);
				});
		};


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
