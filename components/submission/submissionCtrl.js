(function () {

	'use strict';

	angular
		.module('app')
		.controller('SubmissionCtrl', SubmissionCtrl);

	SubmissionCtrl.$inject = ['apiService', '$scope', '$state'];

	function SubmissionCtrl(apiService, $scope, $state) {

		var vm = this;

		getSubmission();

		function getSubmission() {
			apiService.get('report/admin-get')
				.then((data) => {
					vm.datas = data;
					console.log(data);
				});
		}

		$scope.delete = (id) => {
			console.log(id);
			apiService.get('report/remove?id=' + id)
				.then((id) => {
					$state.reload();
				});
		};

		function approve(id) {
			console.log(id);
			apiService.get('report/approve?id=' + id)
				.then((id) => {
					$state.reload();
				});
		};

		function disapprove(id) {
			console.log(id);
			apiService.get('report/disapprove?id=' + id)
				.then((id) => {
					$state.reload();
				});
		};

		$scope.approved = (id, approved) => {
			if (approved)
				disapprove(id, approved);
			else if (!approved)
				approve(id);
		}

		$scope.saveUser = (event) => {
			event.preventDefault();
		};
		$scope.sortType = ' '; // set the default sort type
		$scope.sortReverse = true; // set the default sort order

		$scope.totalDisplayed = 10;
		$scope.loadMore = () => {
			$scope.totalDisplayed += 10;
		};

	}
}());
