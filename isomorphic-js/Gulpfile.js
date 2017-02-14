'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var gulpBrowserify  = require('gulp-browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var less        = require('gulp-less');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var nodemon     = require('gulp-nodemon');
var babel       = require('gulp-babel')
var watchify    = require('watchify');
var gulpWatchify    = require('gulp-watchify');
var sourcemaps  = require('gulp-sourcemaps');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var pleeease    = require('gulp-pleeease');

var PATHS = {
  "WATCH_SCRIPTS":         "./src/**/*.es6",
  "WATCH_STYLES":          ["./src/**/*.less","./src/*.less"],
  "INCLUDE_APP_SCRIPTS":   "./.bin/client/App.js",
  "INCLUDE_CLIENT_ES6":    "./src/client/App.es6",
  "INCLUDE_SERVER_ES6":    "./src/server/server.es6",
  "INCLUDE_APP_STYLES":    "./src/client/App.less",
  "INCLUDE_SERVER_DIR":    "./src/server/**/*",
  "DIR_BUNDLE":            "./public/",
  "DIR_BUNDLE_SERVER":     "./src/server/",
  "DIR_LIB":               "./lib/"
}

gulp.task('default',  ['server']);
gulp.task('server',   ['bundle','server:run','server:proxy']);
gulp.task('watch',    ['server','watch']);
gulp.task('bundle',   ['bundle:server','bundle:js', 'bundle:css']);


gulp.task('browserify', function(){
  gulp.src(PATHS.INCLUDE_CLIENT_ES6)
    .pipe(gulpBrowserify({
      insertGlobals: true,
      debug: true,
      transform: ['babelify'],
      extensions: ['.es6', '.js']
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(rename('bundle.js'))
    .pipe(sourcemaps.write('./public/'))
    .pipe(gulp.dest('./public/'));
});


var bundlerClient = watchify(browserify({
  entries: PATHS.INCLUDE_CLIENT_ES6,
  transform: [babelify],
  extensions: ['.es6', '.js'],
  debug: true,
  cache: {},
  verbose: true,
  packageCache: {},
  fullPaths: true,
}));


bundlerClient.on('update', function(res){
  console.log("bundler updated:",res);
  compileClient();
});


function compileClient(){
  return bundlerClient
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.DIR_BUNDLE));
}

gulp.task('bundle:client', compileClient);
gulp.task('watchify', ['bundle:css','watch','bundle:client']);

gulp.task('bundle:css', function(){
  gulp.src(PATHS.INCLUDE_APP_STYLES)
    .pipe(plumber())
    .pipe(less())
    .pipe(pleeease())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(PATHS.DIR_BUNDLE));
});


gulp.task('server:proxy', function(){
  browserSync
  .create()
  .init({
    proxy: 'localhost:3000',
    port: '3035',
    browser: 'default'
  });
});

gulp.task('watch', function(){
  gulp.watch(PATHS.WATCH_STYLES, ['bundle:css'], browserSync.reload);
  gulp.watch(PATHS.WATCH_SCRIPTS, ['bundle:client'], browserSync.reload);
});
