const fs = require('fs');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const settings = require('./settings');

module.exports = {
  compress: true,
  contentBase: settings.appPublic,
  clientLogLevel: 'none',
  watchContentBase: true,
  hot: true,
  inline: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500,
  },
  publicPath: '/',
  public: settings.devServer.public,
  quiet: true,
  https: false,
  port: settings.devServer.port,
  sockHost: settings.devServer.sockHost,
  overlay: false,
  historyApiFallback: true,
  proxy: settings.proxy,
  before(app, server) {
    if (fs.existsSync(settings.setupProxy)) {
      // This registers user provided middleware for proxy reasons.
      require(settings.setupProxy)(app);
    }
    app.use(evalSourceMapMiddleware(server));
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  },
};
