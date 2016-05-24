/**
 * @author Hana Lee
 * @since 2016-05-20 12:14
 */

let queries = {
  ITEMS : {
    SELECT_BY_ID : 'SELECT `i`.`id`, `v`.`id` AS `valueId`, `i`.`seq`, ' +
    '`i`.`name`, `i`.`unit`, IFNULL(`v`.`value`, 0) AS `value`, `v`.`created` AS valueTime ' +
    'FROM `Items` as `i` LEFT OUTER JOIN `Values` as `v` ' +
    'ON `i`.`id` = `v`.`item_id` ' +
    'AND `v`.`created` BETWEEN ? AND ? ' +
    'WHERE `i`.`id` = ? ' +
    'AND `i`.`enabled` = 1;',
    SELECT_ALL_ITEMS : 'SELECT `i`.`id`, `v`.`id` AS `valueId`, `i`.`seq`, ' +
    '`i`.`name`, `i`.`unit`, IFNULL(`v`.`value`, 0) AS `value`, `v`.`created` AS valueTime ' +
    'FROM `Items` as `i` LEFT OUTER JOIN `Values` as `v` ' +
    'ON `i`.`id` = `v`.`item_id` ' +
    'AND `v`.`created` BETWEEN ? AND ? ' +
    'WHERE `i`.`enabled` = 1 ' +
    'ORDER BY `i`.`seq` ASC;',
    INSERT_ITEM : 'INSERT INTO `Items` (`seq`, `name`) SELECT MAX(`seq`) + 1, ? FROM `Items`;',
    UPDATE_ITEM : 'UPDATE `Items` SET ' +
    '`seq` = ?, `name` = ?, `unit` = ?, `updated` = STRFTIME(\'%s\', \'now\') || \'000\' ' +
    'WHERE `id` = ?',
    DELETE_ITEM : 'UPDATE `Items` SET ' +
    '`enabled` = 0, `deleted` = STRFTIME(\'%s\', \'now\') || \'000\' ' +
    'WHERE `id` = ?;'
  },
  VALUES : {
    SELECT_BY_ID : 'SELECT `id` AS `valueId`, `item_id` AS `itemId`, `value` FROM `Values` WHERE `id` = ?;',
    INSERT_ITEM_VALUE : 'INSERT INTO `Values` (`item_id`, `value`, `created`) VALUES (?, ?, ?);',
    UPDATE_ITEM_VALUE : 'UPDATE `Values` SET `value` = ?, `updated` = STRFTIME(\'%s\', \'now\') || \'000\' ' +
    'WHERE `id` = ?;'
  }
};

export default queries;
