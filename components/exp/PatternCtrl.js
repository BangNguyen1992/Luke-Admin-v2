(function () {

	'use strict';

	angular
		.module('app')
		.controller('PatternCtrl', PatternCtrl);

	PatternCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

	function PatternCtrl(authService, apiService, $scope, $state) {

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

		
		$scope.delete = function(id) {
      console.log(id);
			apiService.get('experience/remove?id='+id);
			$state.reload(this);
     };
		
		$scope.activate = function(id, active){
			console.log(active);
			if(active){
				alert("The pattern is already activated");
			}
			apiService.get('experience/activate?id='+id)
				.then(function (data) {
				$state.reload(this);
			});;
			
		}
		
		
		
		
	}
}());