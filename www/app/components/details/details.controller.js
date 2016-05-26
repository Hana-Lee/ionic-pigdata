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
    console.info('details controller constructor');
    this.chats = factory.all();
    this.options = {
      chart : {
        type : 'discreteBarChart',
        height : 500,
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
        showValues : true
      }
    };
    this.data = [
      {
        key : 'Cumulative Return',
        values : [
          {
            'label' : 'A Label',
            'value' : -29.765957771107
          },
          {
            'label' : 'B Label',
            'value' : 0
          },
          {
            'label' : 'C Label',
            'value' : 32.807804682612
          },
          {
            'label' : 'D Label',
            'value' : 196.45946739256
          },
          {
            'label' : 'E Label',
            'value' : 0.19434030906893
          },
          {
            'label' : 'F Label',
            'value' : -98.079782601442
          },
          {
            'label' : 'G Label',
            'value' : -13.925743130903
          },
          {
            'label' : 'H Label',
            'value' : -5.1387322875705
          }
        ]
      }
    ];
  }
}

export default ['details.factory', DetailsController];
