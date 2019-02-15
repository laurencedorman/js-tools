process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const settings = require('../settings');
const config = require('../config.js');
const devServerConfig = require('../server.js');

const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, devServerConfig);

devServer.listen(settings.devServer.port, settings.devServer.host, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Starting the development server...\n');
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
