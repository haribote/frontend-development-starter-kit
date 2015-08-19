/**
 * gulpfile.js
 */

// load modules
var fs           = require('fs');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var filter       = require('gulp-filter');
var jade         = require('gulp-jade');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith  = require('gulp.spritesmith');
var iconfont     = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var merge        = require('event-stream').merge;

// load configurations
var paths = require('./project-path.config');
var tasks = require('./gulp-task.config');

/**
 * html:pre
 * - compile jade
 */
gulp.task('html:pre', function () {
  return gulp.src(paths.src.htmlFiles)
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path);
    }))
    .pipe(jade(tasks.jade))
    .pipe(gulp.dest(paths.dest.dir));
});

/**
 * css:pre
 * - compile scss
 */
gulp.task('css:pre', function () {
  return gulp.src(paths.src.cssFiles)
    .pipe(plumber())
    .pipe(filter(function (file) {
      var path = file.path;
      return !/\/_/.test(path) && !/\.ejs/.test(path);
    }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer(tasks.autoprefixer))
    .pipe(gulp.dest(paths.dest.cssDir));
});

/**
 * image:sprite
 * - generate sprite-image
 */
gulp.task('image:sprite', function () {
  var sprite = gulp.src(paths.src.spriteFiles)
    .pipe(plumber())
    .pipe(spritesmith(tasks.spritesmith));

  return merge(
    sprite.img.pipe(gulp.dest(paths.src.imageDir)),
    sprite.css.pipe(gulp.dest(paths.src.cssDir))
  );
});

/**
 * font
 * - generete icon-font from svg
 */
gulp.task('font', function () {
  var fontName = tasks.iconfont.fontName;

  return gulp.src(paths.src.fontFiles)
    .pipe(plumber())
    .pipe(iconfont(tasks.iconfont))
    .on('glyphs', function (glyphs) {
      var option = {
        glyphs   : glyphs,
        fontName : fontName,
        fontPath : '/assets/fonts/',
        className: 'glyphicon'
      };

      gulp.src(paths.src.dir + '/assets/fonts/_template/_icons.scss')
        .pipe(consolidate('lodash', option))
        .pipe(rename({
          basename: '_' + fontName
        }))
        .pipe(gulp.dest(paths.src.cssDir));

      gulp.src(paths.src.dir + '/assets/fonts/_template/_icons.html')
        .pipe(consolidate('lodash', option))
        .pipe(rename({
          basename: '_' + fontName + '_sample'
        }))
        .pipe(gulp.dest(paths.dest.dir));
    })
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path);
    }))
    .pipe(gulp.dest(paths.dest.fontDir));
});

/**
 * build:pre
 * - pre build
 */
gulp.task('build:pre', function () {
  return runSequence(
    'image:sprite',
    'font',
    'html:pre',
    'css:pre'
  );
});


/**
 * watch
 * - do pre process watch files
 */
gulp.task('watch', ['build:pre'], function () {
  gulp.watch(paths.src.htmlFiles, ['html:pre']);
  gulp.watch(paths.src.cssFiles, ['css:pre']);
  fs.watchFile(paths.src.spriteDir, function () {
    return runSequence('image:sprite');
  });
  fs.watchFile(paths.src.fontDir, function () {
    return runSequence('font');
  });
});
