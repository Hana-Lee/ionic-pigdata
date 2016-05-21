/**
 * @author Hana Lee
 * @since 2016-05-20 12:14
 */

let queries = {
  ITEMS : {
    SELECT_BY_ID : 'SELECT `i`.`id`, `v`.`id` AS `valueId`, `i`.`seq`, ' +
    '`i`.`name`, `i`.`unit`, IFNULL(`v`.`value`, 0) AS `value` ' +
    'FROM `Items` as `i` LEFT OUTER JOIN `Values` as `v` ' +
    'ON `i`.`id` = `v`.`item_id` WHERE `i`.`id` = ?;',
    SELECT_ALL_ITEMS : 'SELECT `i`.`id`, `v`.`id` AS `valueId`, `i`.`seq`, ' +
    '`i`.`name`, `i`.`unit`, IFNULL(`v`.`value`, 0) AS `value` ' +
    'FROM `Items` as `i` LEFT OUTER JOIN `Values` as `v` ' +
    'ON `i`.`id` = `v`.`item_id` ORDER BY `i`.`seq` ASC;',
    INSERT_ITEM : 'INSERT INTO `Items` (`seq`, `name`) SELECT MAX(`seq`) + 1, ? FROM `Items`;',
    UPDATE_ITEM : 'UPDATE `Items` SET ' +
    '`seq` = ?, `name` = ?, `unit` = ?, `updated` = ? ' +
    'WHERE `id` = ?',
    DELETE_ITEM : 'UPDATE `Items` SET `enabled` = ?, `deleted` = ? WHERE `id` = ?;'
  },
  VALUES : {
    INSERT_ITEM_VALUE : 'INSERT INTO `Values` (`item_id`, `value`) VALUES (?, ?);',
    UPDATE_ITEM_VALUE : 'UPDATE `Values` SET `value` = ?, `updated` = ? WHERE `id` = ?;'
  }
};

export default queries;
