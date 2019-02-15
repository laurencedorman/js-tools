'use strict';

const settings = require('./settings');

module.exports = {
  compress: true,
  contentBase: settings.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: './',
  quiet: true,
  https: true,
  port: settings.port,
  overlay: false,
  proxy: settings.proxy,
};
