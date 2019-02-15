'use strict';

const browserlist = require('@manomano/browserslist-config');

module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      browsers: browserlist,
    }),
  ],
};
