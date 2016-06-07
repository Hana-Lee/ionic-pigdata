/**
 * @author Hana Lee
 * @since 2016-05-28 19:16
 */

import Item from './item.vo';
/**
 * @class ItemService
 * @prop {Object} $q
 * @prop {SqliteService} SqliteService
 * @prop {Object} QUERIES
 */
class ItemService {
  /**
   * @constructor
   * @param {Object} $q
   * @param {SqliteService} SqliteService
   * @param {Object} QUERIES
   */
  constructor($q, SqliteService, QUERIES) {
    this.$q = $q;
    this.SqliteService = SqliteService;
    this.QUERIES = QUERIES;
  }

  /**
   * @memberof ItemService.getAllItem
   * @param {Date} dateObj
   * @returns {Promise} promise object
   */
  getAllItem(dateObj) {
    let deferred = this.$q.defer();

    let query = this.QUERIES.ITEMS.SELECT_ALL_ITEMS;
    let from = dateObj.setHours(0, 0, 0, 0);
    let to = dateObj.setHours(23, 59, 59, 999);
    let params = [from, to];
    this.SqliteService.getItems(query, params).then((items) => {
      let results = [];
      if (items) {
        for (let i of items) {
          results.push(new Item(i.id, i.valueId, i.seq, i.name, i.unit, i.value, i.valueTime));
        }
      }
      deferred.resolve(results);
    }, (err) => deferred.reject(err));

    return deferred.promise;
  }

  getItem(itemId, dateObj) {
    let deferred = this.$q.defer();

    let query = this.QUERIES.ITEMS.SELECT_BY_ID;
    let from = dateObj.setHours(0, 0, 0, 0);
    let to = dateObj.setHours(23, 59, 59, 999);
    let params = [from, to, itemId];
    this.SqliteService.getItem(query, params).then((result) => {
      let newItem = null;
      if (result) {
        newItem = new Item(result.id, result.valueId, result.seq, result.name, 
          result.unit, result.value, result.valueTime);
      }
      deferred.resolve(newItem);
    }, (err) => deferred.reject(err));

    return deferred.promise;
  }
}

export default ['$q', 'SqliteService', 'QUERIES', ItemService];
