(function () {

	'use strict';

	angular
		.module('app')
		.controller('GetMarkerCtrl', GetMarkerCtrl);

	GetMarkerCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function GetMarkerCtrl(authService, apiService, $scope, $state) {

		var vm = this;
		vm.authService = authService;

		activate();
		// fetch all the markers saved on the server
		function activate() {
			apiService.get('marker')
				.then(function (data) {
					vm.datas = data;
				});
		}

		$scope.delete = (id) => {
			console.log(id);
			apiService.get('marker/remove?id=' + id)
				.then((id) => {
					$state.reload();
				});
		};

		$scope.saveUser = (event) => {
			event.preventDefault();
		};
		$scope.sortType = ' '; // set the default sort type
		$scope.sortReverse = true; // set the default sort order

		$scope.totalDisplayed = 10;
		$scope.loadMore = () =>
			$scope.totalDisplayed += 10;
	};

}());
