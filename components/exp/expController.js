(function () {

  'use strict';

  angular
    .module('app')
    .controller('EXPCtrl', EXPCtrl);

  HomeController.$inject = ['authService'];

  function EXPCtrl(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
