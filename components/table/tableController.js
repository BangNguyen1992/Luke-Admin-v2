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
    }

}());
