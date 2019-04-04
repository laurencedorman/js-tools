'use strict';

const settings = require('./settings');

module.exports = {
  compress: true,
  contentBase: settings.appPublic,
  watchContentBase: true,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  publicPath: '/',
  quiet: true,
  https: false,
  port: settings.devServer.port,
  overlay: false,
  proxy: settings.proxy,
};
