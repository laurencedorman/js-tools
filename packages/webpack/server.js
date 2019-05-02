'use strict';

const settings = require('./settings');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

module.exports = {
  compress: true,
  contentBase: settings.appPublic,
  clientLogLevel: 'none',
  watchContentBase: true,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500,
  },
  publicPath: '/',
  quiet: true,
  https: false,
  port: settings.devServer.port,
  overlay: false,
  historyApiFallback: true,
  proxy: settings.proxy,
  before(app, server) {
    app.use(evalSourceMapMiddleware(server));
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  },
};
