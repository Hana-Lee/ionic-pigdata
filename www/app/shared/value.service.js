/**
 * @author Hana Lee
 * @since 2016-05-28 20:26
 */

/**
 * @class ValueService
 * @prop {Object} $q
 * @prop {SqliteService} SqliteService
 * @prop {Object} QUERIES
 */
class ValueService {
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
   * @type {Method} getValuesByItemAndPeriod
   * @param {Item} item
   * @param {Date} from
   * @param {Date} to
   * @returns {Promise} promise object
   */
  getValuesByItemAndPeriod(item, from , to) {
    let deferred = this.$q.defer();

    let query = this.QUERIES.VALUES.SELECT_BY_ITEM_ID_AND_PERIOD;
    let params = [item.id, from.getTime(), to.getTime()];
    this.SqliteService.getItems(query, params)
      .then((result) => deferred.resolve(result),
        (err) => deferred.reject(err));

    return deferred.promise;
  }
}

export default ['$q', 'SqliteService', 'QUERIES', ValueService];
