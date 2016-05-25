/**
 * @author Hana Lee
 * @since 2016-05-16 16:02
 */

/**
 * @class SqliteService
 */
class SqliteService {

  /** @constructor */
  constructor($q, $cordovaSQLite, QUERIES) {
    /** @member {Object} */
    this._db = undefined;
    /** @member {Object} */
    this._$q = $q;
    /** @member {Object} */
    this._$cordovaSQLite = $cordovaSQLite;
    /** @member {Object} */
    this._QUERIES = QUERIES;

    const CREATE_TABLE_ITEMS =
      'CREATE TABLE IF NOT EXISTS `Items` (' +
      '`id` INTEGER NOT NULL,' +
      '`seq` INTEGER NOT NULL,' +
      '`name` VARCHAR(255) NOT NULL UNIQUE,' +
      '`unit` TINYINT NOT NULL DEFAULT (1),' +
      '`enabled` TINYINT NOT NULL DEFAULT (1),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`deleted` TIMESTAMP,' +
      'PRIMARY KEY (`id`),' +
      'CHECK (`unit` IN (1, 5, 10)), CHECK (`seq` >= 0), CHECK (`enabled` IN (0, 1))' +
      ');';

    const CREATE_TABLE_VALUES =
      'CREATE TABLE IF NOT EXISTS `Values` (' +
      '`id` INTEGER NOT NULL,' +
      '`item_id` INTEGER NOT NULL,' +
      '`value` INTEGER NOT NULL DEFAULT (0),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      'PRIMARY KEY (`id`),' +
      'FOREIGN KEY (`item_id`) REFERENCES `Items`(`id`),' +
      'CHECK (`value` >= 0)' +
      ');';

    const CREATE_TABLE_SETTINGS =
      'CREATE TABLE IF NOT EXISTS `Settings` (' +
      '`id` INTEGER NOT NULL,' +
      '`code` VARCHAR(25) NOT NULL,' +
      '`name` VARCHAR(50) NOT NULL,' +
      '`type` VARCHAR(20) NOT NULL DEFAULT (\'boolean\'),' +
      '`opt_code` VARCHAR(255) NOT NULL DEFAULT (\'true|false\'),' +
      '`opt_name` VARCHAR(255) NOT NULL DEFAULT (\'true|false\'),' +
      '`value` VARCHAR(255) NOT NULL DEFAULT (\'true\'),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      'PRIMARY KEY (`id`)' +
      ');';

    this._INIT_QUERIES = [
      CREATE_TABLE_ITEMS, CREATE_TABLE_VALUES, CREATE_TABLE_SETTINGS
    ];

    let names = [
      '물 마시기', '커피 마시기', '담배 피우기', '사랑한다 말하기', '영어단어 외우기',
      '소변 보기', '대변 보기', '머리 감기', '샤워 하기', '양치질 하기'
    ];

    for (let i = 0; i < names.length; i++) {
      let template = 'INSERT INTO `Items` (`seq`, `name`) ' +
        'SELECT ' + (i + 1) + ', \'' + names[i] + '\' ' +
        'WHERE NOT EXISTS (SELECT 1 FROM `Items` WHERE `name` = \'' + names[i] + '\');';
      this._INIT_QUERIES.push(template);
    }

    this._INIT_QUERIES.push('INSERT INTO `Settings` (`code`, `name`, `type`, `opt_code`, `opt_name`, `value`) VALUES' +
      '(\'tab_position\', \'탭위치\', \'choice\', \'top|bottom\', \'상단|하단\', \'bottom\');');

    this.preloadDataBase();
  }

  /**
   * @memberof SqliteService.preloadDataBase
   * @type {Method} preloadDataBase
   * @returns {Object} promise
   */
  preloadDataBase() {
    let deferred = this._$q.defer();
    if (!this._db) {
      if (window.sqlitePlugin !== undefined) {
        console.info('window sqlite plugin use');
        let params = {name : 'pigdata.db', location : 2, createFromLocation : 1};
        this._db = window.sqlitePlugin.openDatabase(params);
      } else {
        // For debugging in the browser
        console.info('window open database use');
        this._db = window.openDatabase('pigdata.db', '1.0', 'Database', 200000);
        this._initData().then(
          (result) => {
            deferred.resolve(result);
          },
          (err) => {
            deferred.reject(err);
          }
        );
      }
    }
    return deferred.promise;
  }

  /**
   * @memberof SqliteService._initData
   * @type {Method} _initData
   * @returns {Object} promise
   * @private
   */
  _initData() {
    let deferred = this._$q.defer();
    console.info('%c *** Starting the creation of the database in the browser *** ',
      'background: #222; color: #bada55');
    this._db.transaction((tx) => {
      for (let i = 0; i < this._INIT_QUERIES.length; i++) {
        let query = this._INIT_QUERIES[i].replace(/\\n/g, '\n');

        console.info(this._INIT_QUERIES[i]);
        tx.executeSql(query);
      }
    }, (error) => {
      deferred.reject(error);
    }, () => {
      console.info('%c *** Completing the creation of the database in the browser *** ',
        'background: #222; color: #bada55');
      deferred.resolve('OK');
    });

    return deferred.promise;
  }

  /**
   * @memberof SqliteService.getItem
   * @type {Method} getItem
   * @param {String} query
   * @param {Object[]} [parameters]
   * @returns {Object} promise
   */
  getItem(query, parameters) {
    let deferred = this._$q.defer();
    this.executeSql(query, parameters).then(function (res) {

      if (res.rows.length > 0) {
        deferred.resolve(res.rows.item(0));
      } else {
        console.error('There aren\'t item matching : ', query, parameters);
        deferred.resolve(null);
      }
    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  /**
   * @memberof SqliteService.getItems
   * @type {Method} getItems
   * @param {String} query
   * @param {Object[]} [parameters]
   * @returns {Object} promise
   */
  getItems(query, parameters) {
    let deferred = this._$q.defer();
    this.executeSql(query, parameters).then((res) => {
      let rowsLength = res.rows.length;
      if (rowsLength > 0) {
        let items = [];
        for (let i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
        deferred.resolve(items);
      } else {
        console.error('There aren\'t items matching : ', query, parameters);
        deferred.resolve(null);
      }
    }, (err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  /**
   * @memberof SqliteService.update
   * @type {Method} update
   * @param {String} query
   * @param {Object[]} [parameters]
   *
   * @returns {Object} promise
   */
  update(query, parameters) {
    let deferred = this._$q.defer();

    let queryType = this._getQueryType(query);
    let tableName = this._extractTableName(query);
    let selectQuery = this._getSelectQuery(tableName);
    this._db.transaction((tx) => {
      tx.executeSql(query, parameters, (tx, resultSet) => {
        if (queryType === 'insert') {
          tx.executeSql(selectQuery, [resultSet.insertId], (tx, resultSet) => {
            if (resultSet.rows && resultSet.rows.length > 0) {
              deferred.resolve(resultSet.rows.item(0));
            } else {
              deferred.resolve(null);
            }
          });
        } else {
          deferred.resolve('Update OK');
        }
      });
    }, (error) => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /**
   * @memberof SqliteService.batchUpdate
   * @type {Method} batchUpdate
   * @param {Array[]} queries
   * @returns {Promise} promise
   */
  batchUpdate(queries) {
    let deferred = this._$q.defer();

    if (window.sqlitePlugin !== undefined) {
      this._db.sqlBatch(queries, (res) => deferred.resolve(res), (err) => deferred.reject(err));
    } else {
      this._db.transaction((tx) => {
        console.info('batch update transaction');
        for (let query of queries) {
          tx.executeSql(query[0], query[1]);
        }
      }, (err) => deferred.reject(err), () => deferred.resolve('Batch update OK'));
    }
    return deferred.promise;
  }

  //noinspection JSMethodCanBeStatic
  /**
   * @memberof SqliteService._extractTableName
   * @type {Method} _extractTableName
   * @param {String} query
   * @returns {String} table name
   * @private
   */
  _extractTableName(query) {
    query = query.substr(query.indexOf('`') + 1);
    query = query.substr(0, query.indexOf('`'));

    return query;
  }

  _getSelectQuery(tableName) {
    let upTableName = tableName.toUpperCase();
    return this._QUERIES[upTableName].SELECT_BY_ID;
  }

  //noinspection JSMethodCanBeStatic
  _getQueryType(query) {
    if (query.toLowerCase().startsWith('select')) {
      return 'select';
    } else if (query.toLowerCase().startsWith('insert')) {
      return 'insert';
    } else if (query.toLowerCase().startsWith('update')) {
      return 'update';
    } else if (query.toLowerCase().startsWith('delete')) {
      return 'delete';
    } else {
      return null;
    }
  }

  /**
   * @memberof SqliteService.executeSql
   * @type {Method} executeSql
   * @param {String} query
   * @param {Object[]} [parameters]
   * @returns {Object} promise
   */
  executeSql(query, parameters) {
    return this._$cordovaSQLite.execute(this._db, query, parameters);
  }
}

export default ['$q', '$cordovaSQLite', 'QUERIES', SqliteService];
