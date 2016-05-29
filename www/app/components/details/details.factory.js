/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import d3 from 'd3';

/**
 * @namespace DetailsFactory
 * @typedef {Object} DetailsFactory
 * @param {Object} $q
 * @param {ValueService} ValueService
 * @param {Function} $moment
 * @returns {{createChartStructure: createChartStructure}}
 */
let detailsFactory = function ($q, ValueService, $moment) {

  let defaultChartOptions = {
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

  let _createDateLabel = function (viewType, momentObj) {
    let dateLabel;
    if (viewType === 'week') {
      dateLabel = `${momentObj.month() + 1}월 ${momentObj.date()}일`;
    } else if (viewType === 'month') {
      dateLabel = `${momentObj.date()}일`;
    } else if (viewType === 'year') {
      dateLabel = `${momentObj.month() + 1}월`;
    }

    return dateLabel;
  };

  /**
   * 차트 랜더링을 위한 데이터 및 옵션 구조 만들기
   * @memberof DetailsFactory.createChartStructure
   * @param {Item} item
   * @param {String} viewType
   * @returns {Promise} promise object
   */
  let createChartStructure = function (item, viewType) {
    // TODO 이 함수 전체적으로 리팩토링 할것.
    let deferred = $q.defer();
    let chartOptions = defaultChartOptions;
    let chartData = [{
      key : item.id,
      values : []
    }];

    let from = $moment().startOf(viewType);
    let to = $moment().endOf(viewType);

    if (viewType === 'week' && (from.day() === 0)) {
      from = $moment().add(-1, 'days').startOf(viewType);
      to = $moment().add(-1, 'days').endOf(viewType);
    }

    if (viewType === 'week') {
      from.add(1, 'days');
      to.add(1, 'days');
    }

    let fromClone = from.clone();
    let valueLength = 7;
    if (viewType === 'month') {
      valueLength = to.date();
    } else if (viewType === 'year') {
      valueLength = (to.month() + 1);
    }

    for (let i = 0; i < valueLength; i++) {
      let labelValue = _createDateLabel(viewType, fromClone);

      chartData[0].values.push({
        label : labelValue, value : 0
      });
      if (viewType === 'year') {
        fromClone.add(1, 'month');
      } else {
        fromClone.add(1, 'days');
      }
    }

    ValueService.getValuesByItemAndPeriod(item, from.toDate(), to.toDate())
      .then((result) => {
        for (let i = 0; i < valueLength; i++) {
          let labelValue = chartData[0].values[i].label;
          if (result) {
            for (let j = 0; j < result.length; j++) {
              /** @prop {Number} created */
              let createDate = $moment(result[j].created);
              let createString = _createDateLabel(viewType, createDate);

              if (labelValue === createString) {
                if (viewType === 'year') {
                  chartData[0].values[i].value += result[j].value;
                } else {
                  chartData[0].values[i].value = result[j].value;
                }
              }
            }
          }
        }
        console.info('chart data : ', chartData);
        deferred.resolve({options : chartOptions, data : chartData});
      }, (err) => deferred.reject(err));

    return deferred.promise;
  };

  return {
    createChartStructure : createChartStructure
  };
};

export default ['$q', 'ValueService', '$moment', detailsFactory];
