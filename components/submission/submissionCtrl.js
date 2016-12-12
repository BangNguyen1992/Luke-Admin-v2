(function () {

	'use strict';

	angular
		.module('app')
		.controller('SubmissionCtrl', SubmissionCtrl);

	SubmissionCtrl.$inject = ['apiService', '$scope', '$state'];

	function SubmissionCtrl(apiService, $scope, $state) {

		var vm = this;

		activate();

		function activate() {
			apiService.get('report/admin-get')
				.then(function (data) {
					vm.datas = data;
					console.log(data);
				});
		}


		$scope.delete = function (id) {
			console.log(id);
			apiService.get('report/remove?id=' + id).then(function (id) {
				$state.reload(this);
			});
		};

		function approve(id) {
			console.log(id);
			apiService.get('report/approve?id=' + id).then(function (id) {
				$state.reload(this);
			});;
		};

		function disapprove(id) {
			console.log(id);
			apiService.get('report/disapprove?id=' + id).then(function (id) {
				$state.reload(this);
			});
		};

		$scope.approved = function (id, approved) {
			if (approved)
				disapprove(id, approved);
			else if (!approved)
				approve(id);

		}

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
