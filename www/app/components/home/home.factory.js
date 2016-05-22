/**
 * @author Hana Lee
 * @since 2016-05-16 16:25
 */

import Item from '../../shared/item.vo';

/**
 * @typedef {Function} HomeFactory
 * @type {HomeFactory}
 * @param {Object} $q
 * @param {Object} SqliteService
 * @param {Object} QUERIES
 * @returns {
 *  {createItem: createItem, getAllItem: getAllItem, createItemValue: createItemValue, updateItemValue: updateItemValue}
 * }
 */
let homeFactory = function ($q, SqliteService, QUERIES) {

  /**
   * @memberof HomeFactory.getAllItem
   * @returns {Object} promise
   */
  let getAllItem = function () {
    var deferred = $q.defer();

    SqliteService.getItems(QUERIES.ITEMS.SELECT_ALL_ITEMS).then((items) => {
      let results = [];
      for (let i of items) {
        results.push(new Item(i.id, i.valueId, i.seq, i.name, i.unit, i.value));
      }
      deferred.resolve(results);
    });

    return deferred.promise;
  };

  let createItem = function (item) {
    let deferred = $q.defer();

    SqliteService.update(QUERIES.ITEMS.INSERT_ITEM, [item.name]).then((result) => {
      _fillFields(item, result);
      deferred.resolve(item);
    }, (err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  /**
   * @type {Function}
   * @param {Object} target
   * @param {Object} source
   * @private
   */
  function _fillFields(target, source) {
    for (var key of Object.keys(source)) {
      if (target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }

  let updateItem = function (item) {
    let deferred = $q.defer();

    let params = [
      item.seq, item.name, item.unit, item.id
    ];
    SqliteService.update(QUERIES.ITEMS.UPDATE_ITEM, params).then((result) => {
      deferred.resolve(result);
    }, (err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  let deleteItem = function (item) {
    let deferred = $q.defer();

    let params = [item.id];
    SqliteService.update(QUERIES.ITEMS.DELETE_ITEM, params).then((result) => {
      deferred.resolve(result);
    }, (err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  let createItemValue = function (item) {

  };

  let updateItemValue = function (item) {

  };

  return {
    createItem : createItem,
    updateItem : updateItem,
    deleteItem : deleteItem,
    getAllItem : getAllItem,
    createItemValue : createItemValue,
    updateItemValue : updateItemValue
  };
};

export default ['$q', 'SqliteService', 'QUERIES', homeFactory];
