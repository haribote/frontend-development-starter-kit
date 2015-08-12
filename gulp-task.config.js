/**
 * gulp-tasks.config.js
 */

// jade
exports.jade = {
  pretty: true
};

// autoprefixer
exports.autoprefixer = {
  browsers: ['last 2 versions']
};

// spritesmith
exports.spritesmith = {
  imgName: 'sprite.png',
  imgPath: '/assets/image/sprite.png',
  cssName: '_sprite.scss',
  padding: 0
};

// iconfont
exports.iconfont = {
  fontName: 'glyphicon-font',
  appendUnicode: true
};
