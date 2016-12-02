(function () {

	'use strict';

	angular
		.module('app')
		.controller('CreateReportCtrl', CreateReportCtrl);

	CreateReportCtrl.$inject = ['authService', 'apiService', '$scope', '$state', 'NgMap'];

	function CreateReportCtrl(authService, apiService, $scope, $state, NgMap) {

		var vm = this;
		vm.authService = authService;

		activate();
		getMap();

		function activate() {
			apiService.get('report/admin-get')
				.then(function (data) {
					vm.datas = data;
//					console.log(data);

				});
		}

		$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyB98zOCWTyVHVu-pWkPq1Df1XuNEHH8Ic0";

	function getMap(){
		NgMap.getMap().then(function(map) {
			console.log('got here?');
    console.log(map);
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
}

		$scope.saveUser = function (event) {
			event.preventDefault();
		};
		$scope.sortType = ' '; // set the default sort type
		$scope.sortReverse = false; // set the default sort order


	}
}());
