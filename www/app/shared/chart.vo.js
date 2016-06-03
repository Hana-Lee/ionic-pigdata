/**
 * @author Hana Lee
 * @since 2016-06-03 17:44
 */

import d3 from 'd3';

/**
 * @class Chart
 * @prop {Array} data
 * @prop {Object} [options]
 */
class Chart {
  /**
   * @constructor
   * @param {Array} data
   * @param {Object} [options]
   */
  constructor(data, options) {
    this.options = options || this._defaultOptions();
    this.data = data;
  }

  //noinspection JSMethodCanBeStatic
  _defaultOptions() {
    return {
      chart : {
        type : 'discreteBarChart',
        height : 400,
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
  }
}

export default Chart;
