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
		
		function activate() {
			apiService.get('marker')
				.then(function (data) {
					vm.datas = data;
				});
		}

		
		$scope.delete = function (id) {
			console.log(id);
			apiService.get('marker/remove?id=' + id).then(function (id) {
				$state.reload(this);
			});
		};
		
		
		
		$scope.saveUser = function (event) {
			event.preventDefault();
		};
		$scope.sortType = ' '; // set the default sort type
		$scope.sortReverse = false; // set the default sort order

		$scope.totalDisplayed = 10;
		$scope.loadMore = function () {
			$scope.totalDisplayed += 10;
		};
		
		
		
	}
}());