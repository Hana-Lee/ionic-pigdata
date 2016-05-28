/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import d3 from 'd3';

/**
 * @param {Object} $q
 * @param {ValueService} ValueService
 * @param {Function} $moment
 * @returns {{createChartStructure: createChartStructure}}
 */
let detailsFactory = function ($q, ValueService, $moment) {

  let defaultChartOptions = {
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

  /**
   * 차트 랜더링을 위한 데이터 및 옵션 구조 만들기
   * @param {Item} item
   * @returns {Promise} promise object
   */
  let createChartStructure = function (item) {
    // TODO 이 함수 전체적으로 리팩토링 할것.
    let deferred = $q.defer();
    let chartOptions = defaultChartOptions;
    let chartData = [{
      key : item.id,
      values : []
    }];

    let from = $moment().startOf('week').add(1, 'days');
    let to = $moment().endOf('week').add(1, 'days');

    let fromClone = from.clone();
    for (let i = 0; i < 7; i++) {
      chartData[0].values.push({
        label : `${fromClone.month() + 1}월 ${fromClone.date()}일`, value : 0
      });
      fromClone.add(1, 'days');
    }

    ValueService.getValuesByItemAndPeriod(item, from.toDate(), to.toDate())
      .then((result) => {
        for (let i = 0; i < 7; i++) {
          let labelValue = chartData[0].values[i].label;
          for (let j = 0; j < result.length; j++) {
            let createDate = $moment(result[j].created);
            let createString = `${createDate.month() + 1}월 ${createDate.date()}일`;
            if (labelValue === createString) {
              chartData[0].values[i].value = result[j].value;
              break;
            }
          }
        }
        deferred.resolve({options : chartOptions, data : chartData});
      }, (err) => deferred.reject(err));

    return deferred.promise;
  };

  return {
    createChartStructure : createChartStructure
  };
};

export default ['$q', 'ValueService', '$moment', detailsFactory];
