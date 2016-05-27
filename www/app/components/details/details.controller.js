/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import d3 from 'd3';

/**
 * @class DetailsController
 * @prop {Array} chats
 */
class DetailsController {
  constructor(factory) {
    console.info('details controller constructor');
    this.chats = factory.all();
    this.viewType = 'week';
    this.options = {
      chart : {
        type : 'discreteBarChart',
        height : 500,
        valueFormat : d3.format(','),
        x : (d) => {
          return d.label;
        },
        y : (d) => {
          return d.value;
        },
        showLabels : true,
        staggerLabels : true,
        duration : 600,
        transitionDuration : 350,
        showValues : true,
        yAxis : {
          tickFormat : d3.format(',')
        }
      }
    };
    this.data = [{
      key : '3',
      values : [{
        'label' : '5월 23일(월)', 'value' : 19
      }, {
        'label' : '5월 24일(화)', 'value' : 10
      }, {
        'label' : '5월 5일(수)', 'value' : 15
      }, {
        'label' : '5월 26일(목)', 'value' : 11
      }, {
        'label' : '5월 27일(금)', 'value' : 13
      }, {
        'label' : '5월 28일(토)', 'value' : 13
      }, {
        'label' : '5월 29일(일)', 'value' : 14
      }]
    }];
  }
}

export default ['details.factory', DetailsController];
