(function () {

    'use strict';

    angular
        .module('app')
        .controller('TABLECtrl', TABLECtrl);

    TABLECtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

    function TABLECtrl(authService, apiService, $scope, $state) {
        var vm = this;
        vm.authService = authService;
        findall();

         function findall (){
             apiService.get('user/get-all')
                 .then(function (data) {
                     vm.datas = data;
					console.log(data);
                 });
        }



        function ban(id){
      			apiService.get('user/ban?id=' + id).then(function (id) {
      				$state.reload(this);
      			});
      		}

      		function unban(id){
      			apiService.get('user/unban?id=' + id).then(function (id) {
      				$state.reload(this);
      			});
      		}

      		$scope.banned = function (id, role) {
      			if (role.indexOf("ban") > -1 )
      				unban(id)
      			else
      				ban(id)
      		}
        // $scope.ban = function (id) {
    		// 	console.log(id);
    			// apiService.get('user/ban?id=' + id).then(function (data) {
              //if (data.success == true) {
   								//console.log(data.success);
                //  $scope.bban = false;
                  //$scope.toogle = function(){
                    //$scope.bban = !$scope.bban;
                  //}
   								  //$scope.btn =""
   								//$scope.Ban = "Unban"
                 //$state.reload(this);

                //}
      				//$state.reload(this);
              //$scope.Ban = "Unban"

    			// })
          //   };

        // $scope.unban = function(id){
        //   apiService.get('user/unban?id=' + id).then(function (data) {
        //       if (data.success == true) {
   							// 	console.log(data.success);
                  // $scope.bban = false;
                  // $scope.toogle = function(){
                    // $scope.bban = !$scope.bban;
                  //}

   								  //$scope.ubbtn ="Un banned"
   									//delete_btn.innerHTML = "Unban"
   								//$scope.Ban = "Unban"
                //  $state.reload(this);

                // }
      	// 			 $state.reload(this);
        //       //$scope.Ban = "Unban"
    		// 	})
        // }

    }

}());