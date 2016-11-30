(function () {

	'use strict';

	angular
		.module('app')
		.controller('EXPCtrl', EXPCtrl);

	EXPCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function EXPCtrl(authService, apiService, $scope, $state) {

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
		
		$scope.delete = function(id) {
         console.log(id);
			apiService.get('experience/remove?id='+id);
//			$state.reload();
     };
		
		$scope.activate = function(id, active){
			console.log(active);
			if(active){
				alert("The pattern is already activated");
			}
			apiService.get('experience/activate?id='+id);
			
		}
		
		
		
		
	}
}());