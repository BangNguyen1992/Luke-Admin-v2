(function () {

	'use strict';

	angular
		.module('app')
		.controller('PatternCtrl', PatternCtrl);

	PatternCtrl.$inject = ['apiService', '$scope', '$state'];

	function PatternCtrl(apiService, $scope, $state) {

		var vm = this;
		$scope.body = {};

		activate();

		function activate() {
			apiService.get('experience')
				.then(function (data) {
					vm.datas = data;
				});
		}


		$scope.delete = function (id) {
			console.log(id);
			apiService.get('experience/remove?id=' + id);
			$state.reload(this);
		};

		$scope.activate = function (id, active) {
			console.log(active);
			if (active) {
				alert("The pattern is already activated");
			}
			apiService.get('experience/activate?id=' + id)
				.then(function (data) {
					$state.reload(this);
				});;

		}


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
