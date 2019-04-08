const envVariables = require('dotenv-extended').load();

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');

const settings = require('../settings');
const config = require('../config.js');
const devServerConfig = require('../server.js');

const isInteractive = process.stdout.isTTY;

// Process CLI arguments
const argv = process.argv.slice(2);
const parsedArgs = require('minimist')(argv);
const { lang } = parsedArgs;

const compiler = webpack(config(lang, envVariables));
const devServer = new WebpackDevServer(compiler, devServerConfig);

devServer.listen(settings.devServer.port, settings.devServer.host, err => {
  if (err) {
    return console.log(err);
  }
  if (isInteractive) {
    clearConsole();
  }
  console.log(chalk.rgb(41, 185, 173)('Starting the development server...\n'));
  const URL = 'http://localhost:' + settings.devServer.port;
  console.log(URL);
  openBrowser(URL);
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
