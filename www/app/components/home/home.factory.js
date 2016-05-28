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
 *  {
 *  createItem: Function, updateItem: Function, deleteItem: Function,
 *  createItemValue: Function, updateItemValue: Function
 *  }
 * }
 */
let homeFactory = function ($q, SqliteService, QUERIES) {

  /**
   * @memberof HomeFactory.createItem
   * @type {Function} createItem
   * @param {Item} item
   * @returns {Promise} promise
   */
  let createItem = function (item) {
    let deferred = $q.defer();

    SqliteService.update(QUERIES.ITEMS.INSERT_ITEM, [item.name]).then((result) => {
      _fillFields(item, result);
      deferred.resolve(item);
    }, (err) => deferred.reject(err));

    return deferred.promise;
  };

  /**
   * @memberof HomeFactory._fillFields
   * @type {Function} _fillFields
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

  /**
   * @memberof HomeFactory.updateItem
   * @type {Function} updateItem
   * @param {Item} item
   * @returns {Promise} promise
   */
  let updateItem = function (item) {
    let deferred = $q.defer();

    let query = QUERIES.ITEMS.UPDATE_ITEM;
    let params = [
      item.seq, item.name, item.unit, item.id
    ];
    SqliteService.update(query, params)
      .then((result) => deferred.resolve(result), (err) => deferred.reject(err));

    return deferred.promise;
  };

  /**
   * @memberof HomeFactory.deleteItem
   * @type {Function} deleteItem
   * @param {Item} item
   * @returns {Promise} promise
   */
  let deleteItem = function (item) {
    let deferred = $q.defer();

    let query = QUERIES.ITEMS.DELETE_ITEM;
    let params = [item.id];
    SqliteService.update(query, params)
      .then((result) => deferred.resolve(result), (err) => deferred.reject(err));

    return deferred.promise;
  };

  /**
   * @memberof HomeFactory.createItemValue
   * @type {Function} createItemValue
   * @param {Item} item
   * @returns {Promise} promise
   */
  let createItemValue = function (item) {
    let deferred = $q.defer();

    let query = QUERIES.VALUES.INSERT_ITEM_VALUE;
    let params = [item.id, item.value, item.valueTime];
    SqliteService.update(query, params)
      .then((result) => deferred.resolve(result), (err) => deferred.reject(err));

    return deferred.promise;
  };

  /**
   * @memberof HomeFactory.updateItemValue
   * @type {Function} updateItemValue
   * @param {Item} item
   * @returns {Promise} promise
   */
  let updateItemValue = function (item) {
    let deferred = $q.defer();

    let query = QUERIES.VALUES.UPDATE_ITEM_VALUE;
    let params = [item.value, item.valueId];
    SqliteService.update(query, params)
      .then((result) => deferred.resolve(result), (err) => deferred.reject(err));

    return deferred.promise;
  };

  let updateItems = function(items) {
    let deferred = $q.defer();

    let updateQueries = [];
    for (let item of items) {
      updateQueries.push([QUERIES.ITEMS.UPDATE_ITEM, [item.seq, item.name, item.unit, item.id]]);
    }

    SqliteService.batchUpdate(updateQueries)
      .then((result) => deferred.resolve(result), (err) => deferred.reject(err));

    return deferred.promise;
  };

  return {
    createItem : createItem,
    updateItem : updateItem,
    deleteItem : deleteItem,
    createItemValue : createItemValue,
    updateItemValue : updateItemValue,
    updateItems : updateItems
  };
};

export default ['$q', 'SqliteService', 'QUERIES', homeFactory];
