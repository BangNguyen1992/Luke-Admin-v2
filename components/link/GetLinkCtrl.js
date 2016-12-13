(function () {

	'use strict';

	angular
		.module('app')
		.controller('GetLinkCtrl', GetLinkCtrl);

	GetLinkCtrl.$inject = ['apiService', '$scope', '$state'];

	function GetLinkCtrl(apiService, $scope, $state) {
		var vm = this;

		findall();

		function findall() {
			apiService.get('link/admin-get')
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
			apiService.get('link/remove?id=' + id)
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
