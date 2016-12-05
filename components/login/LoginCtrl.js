(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['authService'];

  function LoginCtrl(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
