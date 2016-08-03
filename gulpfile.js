const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const cssnext = require('postcss-cssnext');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
process.env.NODE_ENV = 'development';

const rollup = require('rollup').rollup;
const bowerResolve =require('rollup-plugin-bower-resolve');
const buble = require('rollup-plugin-buble');
var cache;

gulp.task('mustache', function () {
  const DEST = '.tmp';

  return gulp.src('./demos/src/index.mustache') 
    .pipe($.mustache({
      "iconsPath": "/bower_components/ftc-icons/",
      "pageTitle": 'AB test'
    }, {
      extension: '.html'
    }))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';

  return gulp.src('main.scss')
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('webpack', function(done) {
  const DEST = '.tmp/scripts/';

  return gulp.src('index.js')
    .pipe($.plumber())
    .pipe(webpackStream(webpackConfig, null, function(err, stats) {
      $.util.log(stats.toString({
          colors: $.util.colors.supportsColor,
          chunks: false,
          hash: false,
          version: false
      }));
      browserSync.reload();
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('clean', function() {
  return del(['.tmp/**']);
});

gulp.task('serve', gulp.parallel('mustache', 'styles', 'webpack', function serve () {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['demos/src/*.{mustache}'], gulp.parallel('mustache'));

  gulp.watch(['*.scss'], gulp.parallel('styles'));
  gulp.watch(['*.js'], gulp.parallel('webpack'));

}));

gulp.task('rollup', () => {
  return rollup({
    entry: 'index.js',
    plugins: [buble()],
    cache: cache,
    // external: ['dom-delegate']
  }).then(function(bundle) {
    cache = bundle;

    return bundle.write({
      format: 'iife',
      moduleName: 'ABTest',
      moduleId: 'ab-test',
      // globals: {
      //   'dom-delegate': 'domDelegate.Delegate'
      // },
      dest: 'dist/ab-test.js',
      sourceMap: true,
    });
  });
});