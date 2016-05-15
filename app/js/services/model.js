/**
 * @author Hana Lee
 * @since 2016-05-14 20:38
 */

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
