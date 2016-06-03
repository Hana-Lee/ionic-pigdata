/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */
/*globals angular */
import Value from '../../shared/value.vo';
import Chart from '../../shared/chart.vo';
import MomentPeriod from '../../shared/moment_period.vo';

/**
 * @namespace DetailsFactory
 * @typedef {Object} DetailsFactory
 * @param {Object} $q
 * @param {ValueService} ValueService
 * @param {Function} $moment
 * @returns {{createChartStructure: createChartStructure}}
 */
let detailsFactory = function ($q, ValueService, $moment) {

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
   * 기본적으로 자바스크립트의 date 객체는 일요일이 시작 인데 구현 특징상
   * 월요일을 일주일의 시작으로 하는 기간 오브젝트를 만들어 반환한다.
   *
   * @param {Date} date
   * @param {String} viewType - year, month, week
   * @returns {MomentPeriod} new period object
   * @private
   */
  let _createPeriod = function (date, viewType) {
    let from = $moment(date).startOf(viewType);
    let to = $moment(date).endOf(viewType);

    if (viewType === 'week' && (from.day() === 0)) {
      from = $moment(date).add(-1, 'days').startOf(viewType);
      to = $moment(date).add(-1, 'days').endOf(viewType);
    }

    if (viewType === 'week') {
      from.add(1, 'days');
      to.add(1, 'days');
    }

    return new MomentPeriod(from, to);
  };

  /**
   * 차트에 표기할 데이터의 갯수를 계산하여 반환한다
   * 연 마지막 월, 월 데이터는 월의 마지막날, 주 데이터는 7
   *
   * @param {MomentPeriod} period
   * @param {String} viewType - year, month, week
   * @returns {Number} 연, 월, 주 데이터에 따른 데이터 항목 갯수
   * @private
   */
  let _getValueLengthFromPeriod = function (period, viewType) {
    let valueLength = 7;

    if (viewType === 'month') {
      valueLength = period.to.date();
    } else if (viewType === 'year') {
      valueLength = (period.to.month() + 1);
    }

    return valueLength;
  };

  /**
   * 차트에 사용할 값 항목의 레이블 생성 및 초기값 0으로 생성하여 반환한다
   * 값항목은 List 형태로 반환하며 항목의 갯수는 연, 월, 주 에 따라 다르다.
   *
   * @param {MomentPeriod} period
   * @param {String} viewType - year, month, week
   * @returns {Value[]} value list
   * @private
   */
  let _createChartValue = function (period, viewType) {
    let fromClone = period.from.clone();
    let valueLength = _getValueLengthFromPeriod(period, viewType);
    let values = [];
    let addMethod = (viewType === 'year') ? 'month' : 'days';

    for (let i = 0; i < valueLength; i++) {
      let labelValue = _createDateLabel(viewType, fromClone);

      values.push(new Value(labelValue, 0));
      fromClone.add(1, addMethod);
    }

    return values;
  };

  /**
   * 데이터베이스로부터 조회된 결과를 이용하여 이전에 초기 생성하였던
   * Value 객체의 값 필드를 날짜 레이블과 비교하여 채워 넣는다
   *
   * @param {Value[]} chartValues
   * @param {Array} dbResult
   * @param {String} viewType
   * @returns {Value[]} result
   * @private
   */
  let _fillValuesField = function (chartValues, dbResult, viewType) {
    let valueLength = chartValues.length;

    //noinspection JSValidateTypes
    /** @type {Value[]} result */
    let result = angular.extend([], chartValues);

    for (let i = 0; i < valueLength; i++) {
      let labelValue = chartValues[i].label;
      if (dbResult) {
        for (let j = 0; j < dbResult.length; j++) {
          /** @prop {Number} created */
          let createDate = $moment(dbResult[j].created);
          let createString = _createDateLabel(viewType, createDate);

          if (labelValue === createString) {
            if (viewType === 'year') {
              result[i].value += dbResult[j].value;
            } else {
              result[i].value = dbResult[j].value;
            }
          }
        }
      }
    }

    return result;
  };

  /**
   * 차트 랜더링을 위한 데이터 및 옵션 구조 만들기
   * @memberof DetailsFactory.createChartStructure
   * @param {Item} item
   * @param {String} viewType
   * @param {Date} selectedDate
   * @returns {Promise} promise object
   */
  let createChartStructure = function (item, viewType, selectedDate) {
    let deferred = $q.defer();
    let period = _createPeriod(selectedDate, viewType);
    let chartValues = _createChartValue(period, viewType);

    let fromDate = period.from.toDate();
    let toDate = period.to.toDate();

    ValueService.getValuesByItemAndPeriod(item, fromDate, toDate)
      .then((result) => {
        let filledValues = _fillValuesField(chartValues, result, viewType);
        let chartData = [{key : item.id, values : filledValues}];

        deferred.resolve(new Chart(chartData));
      }, (err) => deferred.reject(err));

    return deferred.promise;
  };

  return {
    createChartStructure : createChartStructure
  };
};

export default ['$q', 'ValueService', '$moment', detailsFactory];
