/**
 * @author Hana Lee
 * @since 2016-05-16 18:11
 */

let settingsFactory = function () {
  let resources = {
    enableFriends : true
  };

  return {
    getSettings : getSettings
  };

  function getSettings() {
    return resources;
  }
};

export default [settingsFactory];
