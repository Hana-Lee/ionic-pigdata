/**
 * @author Hana Lee
 * @since 2016-05-16 11:55
 */

import Base from './base/base';
import Home from './home/home';
import Details from './details/details';
import Settings from './settings/settings';

let componentModule = angular.module('PIGDATA.components', [
  Base.name, Home.name, Details.name, Settings.name
]);

export default componentModule;
