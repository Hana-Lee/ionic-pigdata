// Import modules
import gulp from 'gulp';
import webpack from 'webpack-stream';
import path from 'path';
import sync from 'run-sequence';
import serve from 'browser-sync';
import rename from 'gulp-rename';
import template from 'gulp-template';
import yargs from 'yargs';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';
import preen from 'preen';
import notify from 'gulp-notify';
import util from 'gulp-util';

let reload = () => serve.reload();
let root = 'www';

// Helper method for resolving paths
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob);
};

let resolveToComponents = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/', glob);
};

// Map of all paths
let paths = {
  js : resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  html : [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  index : './app/index.html',
  entry : path.join(root, 'app/app.js'),
  output : root,
  blankTemplates : path.join(__dirname, 'generator', 'component/**/*.**'),
  sass : ['./scss/**/*.scss']
};

// Use webpack.config.js to build modules
gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

// Start server for browser-sync
gulp.task('serve', () => {
  serve({
    port : process.env.PORT || 3000,
    open : 'local',
    browser : 'google chrome',
    server : {baseDir : root}
  });
});

gulp.task('component', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  //noinspection JSUnresolvedVariable
  let name = yargs.argv.name;
  //noinspection JSUnresolvedVariable
  let parentPath = yargs.argv.parent || '';
  let destPath = path.join(resolveToComponents('components'), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name : name,
      upCaseName : cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

// Compile, minify and rename sass file
gulp.task('sass', () => {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments : 0
    }))
    .pipe(rename({extname : '.min.css'}))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('preen', () => {
  preen.preen({}, () => {
    gulp.src('').pipe(notify({message : 'Lib builded'}));
  });
});

// Watching all files and reload server
gulp.task('watch', () => {
  let allPaths = [].concat([paths.js], paths.html, [paths.sass]);
  gulp.watch(allPaths, ['webpack', 'sass', reload]);
});

// Start all tasks
gulp.task('default', () => {
  sync('webpack', 'sass', 'preen');
});

// Start server
gulp.task('server', (done) => {
  sync('default', 'watch', 'serve', done);
});