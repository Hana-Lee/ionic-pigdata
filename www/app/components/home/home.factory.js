/**
 * @author Hana Lee
 * @since 2016-05-16 16:25
 */

import Item from '../../shared/item.vo';

let homeFactory = function ($q, SqliteService, QUERIES) {

  let getAllItem = function () {
    var deferred = $q.defer();
    //noinspection JSUnresolvedFunction
    SqliteService.getItems(QUERIES.SELECT_ALL_ITEMS).then((items) => {
      let results = [];
      for (let i of items) {
        results.push(new Item(i.id, i.valueId, i.seq, i.name, i.unit, i.value));
      }
      deferred.resolve(results);
    });

    return deferred.promise;
  };

  let createItemValue = function (item) {

  };

  let updateItemValue = function (item) {

  };

  return {
    getAllItem : getAllItem,
    createItemValue : createItemValue,
    updateItemValue : updateItemValue
  };
};

export default ['$q', 'SqliteService', 'QUERIES', homeFactory];
