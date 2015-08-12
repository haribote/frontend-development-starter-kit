/**
 * browser-sync.config.js
 */

// import configurations
var paths = require('./project-path.config');

// export module
module.exports = {
  server        : {
    baseDir: [paths.dest.dir, paths.src.dir]
  },
  files         : [paths.dest.dir],
  open          : false,
  reloadDebounce: 2000
};
