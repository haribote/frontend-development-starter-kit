/**
 * project-path.config.js
 */

// constants
var SRC     = './src';
var DEST    = './dest';
var ASSETS  = '/assets';

// export
module.exports = {
  src : {
    dir        : SRC,
    htmlFiles  : SRC + '/**/*.jade',
    cssDir     : SRC + ASSETS + '/css',
    cssFiles   : SRC + ASSETS + '/css/**/*.scss',
    imageDir   : SRC + ASSETS + '/image',
    imageFiles : SRC + ASSETS + '/image/**/*',
    spriteDir  : SRC + ASSETS + '/image/sprite',
    spriteFiles: SRC + ASSETS + '/image/sprite/**/*',
    fontDir        : SRC + ASSETS + '/fonts',
    fontFiles      : SRC + ASSETS + '/fonts/**/*'
  },
  dest: {
    dir       : DEST,
    htmlFiles : DEST + '/**/*.html',
    cssDir    : DEST + ASSETS + '/css',
    cssFiles  : DEST + ASSETS + '/css/**/*.css',
    imageDir  : DEST + ASSETS + '/image',
    imageFiles: DEST + ASSETS + '/image/**/*',
    fontDir:   DEST + ASSETS + '/fonts',
    fontFiles: DEST + ASSETS + '/fonts/**/*'
  }
};
