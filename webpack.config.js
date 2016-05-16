/**
 * @author Hana Lee
 * @since 2016-05-16 11:55
 */

module.exports = {
  resolve : {
    modulesDirectories : ['node_modules']
  },
  devtool : 'sourcemap',
  output : {
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {test : /\.js$/, exclude : [/www\/lib/, /node_modules/], loader : 'ng-annotate!babel'},
      {test : /\.html$/, loader : 'raw'},
      {test : /\.styl$/, loader : 'style!css!stylus'},
      {test : /\.css$/, loader : 'style!css'}
    ]
  }
};
