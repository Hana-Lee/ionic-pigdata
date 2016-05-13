(function () {
  'use strict';

  angular
    .module('PIGDATA')
    .factory('Model', Model);

  Model.$inject = ['Users'];
  function Model(Users) {

    return {
      Users : Users
    };
  }
})();
