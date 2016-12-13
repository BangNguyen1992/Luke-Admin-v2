(function () {

	'use strict';

	angular
		.module('app')
		.controller('PatternCtrl', PatternCtrl);

	PatternCtrl.$inject = ['apiService', '$scope', '$state'];

	function PatternCtrl(apiService, $scope, $state) {

		var vm = this;

		getPattern();

		function getPattern() {
			apiService.get('experience')
				.then((data) => {
					vm.datas = data;
				});
		}

		$scope.delete = (id) => {
			console.log(id);
			apiService.get('experience/remove?id=' + id);
			$state.reload();
		};

		$scope.activate = (id, active) => {
			console.log(active);
			if (active) {
				alert("The pattern is already activated");
			}
			apiService.get('experience/activate?id=' + id)
				.then((data) => {
					$state.reload();
				});
		}


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
