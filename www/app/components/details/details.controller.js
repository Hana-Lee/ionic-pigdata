/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/**
 * @class DetailsController
 * @prop {Array} chats
 */
class DetailsController {
  constructor(factory) {
    this.chats = factory.all();
  }
}

export default ['details.factory', DetailsController];
