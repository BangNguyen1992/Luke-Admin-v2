(function() {
  'use strict';

  angular
    .module('app')
    .factory('apiService', apiService);

  apiService.$inject = ['$http', '$q'];

  /* @ngInject */
  function apiService($http, $q) {
    var service = {
      get: get,
      post: post,
    };
		
    $http.defaults.headers.common = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ localStorage.id_token,
			'acstoken': localStorage.acstoken
		};
		
    var rootUrl = 'http://www.balticapp.fi/lukeA/';

    return service;

    function get(path, config) {
      var defer = $q.defer();
      $http.get(rootUrl + path, config)

      .then(function (res) {
        defer.resolve(res.data);
      })

      .catch(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    }

    function post(path, body, config) {
      var defer = $q.defer();
      console.log(body);
      console.log(config);
      $http.post(rootUrl + path, body, config)

      .then(function (res) {
        defer.resolve(res.data);
      })

      .catch(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }
})();
