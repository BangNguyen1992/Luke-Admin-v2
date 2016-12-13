(function () {

	'use strict';

	angular
		.module('app')
		.controller('GetCategoryCtrl', GetCategoryCtrl);

	GetCategoryCtrl.$inject = ['apiService', '$scope', '$state'];

	function GetCategoryCtrl(apiService, $scope, $state) {
		var vm = this;

		findall();
// Fetch all the catagories from the server
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

		$scope.delete = (id) => {
			console.log(id);
			apiService.get('category/remove?id=' + id)
				.then((id) => {
					$state.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		};

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
