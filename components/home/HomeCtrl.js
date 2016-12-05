(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['authService'];

  function HomeCtrl(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
