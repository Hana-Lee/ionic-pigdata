/**
 * @author Hana Lee
 * @since 2016-05-16 18:11
 */

class SettingsController {
  constructor(factory) {
    //noinspection JSUnresolvedVariable
    this.settings = factory.getSettings();
  }

  init() {}
}

export default ['settings.factory', SettingsController];
