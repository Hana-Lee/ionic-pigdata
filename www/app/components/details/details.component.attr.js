/**
 * @author Hana Lee
 * @since 2016-05-29 17:49
 */

let detailsComponentAttr = function () {
  return {
    restrict : 'A',
    require : 'ngModel',
    scope : {
      model : '=ngModel',
      value : '=groupedRadio'
    },
    link : (scope, element, attrs, ngModelCtrl) => {
      element.addClass('button');
      element.on('click', () => {
        // scope.$apply(() => controller.$setViewValue(scope.value));
        ngModelCtrl.$setViewValue(scope.value);
      });

      scope.$watch('model', (newValue) => {
        element.removeClass('button-positive');
        if (newValue === scope.value) {
          element.addClass('button-positive');
        }
      });
    }
  };
};

export default [detailsComponentAttr];
