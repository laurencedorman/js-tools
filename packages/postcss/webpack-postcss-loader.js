'use strict';

const path = require('path');

module.exports = {
  loader: require.resolve('postcss-loader'),
  options: {
    config: {
      path: path.resolve(__dirname),
    },
  },
};

