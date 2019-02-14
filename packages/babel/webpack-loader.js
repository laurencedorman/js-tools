'use strict';

module.exports = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: [require.resolve('./preset')],
    cacheDirectory: true,
    cacheCompression: false,
    compact: false,
    babelrc: false,
    configFile: false,
  },
};
