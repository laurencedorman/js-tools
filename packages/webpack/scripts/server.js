const envVariables = require('dotenv-extended').load();

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.IS_SERVER = true;

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');

const fs = require('fs-extra');
const settings = require('../settings');
const { paths } = require('@manomano/project-settings');
const serverConfig = require('../server-config');
const clientConfig = require('../config');

const devServerConfig = require('../server.js');
const WebpackDevServer = require('webpack-dev-server');

// Process CLI arguments
const argv = process.argv.slice(2);
const parsedArgs = require('minimist')(argv);
const { lang } = parsedArgs;

try {
  fs.emptyDirSync(settings.appServerOutput);

  // Delete assets.json to always have a manifest up to date
  fs.removeSync(paths.appManifest);

  process.env.ASSETS_MANIFEST = paths.appManifest;

  const serverCompiler = webpack(serverConfig(lang));
  const clientCompiler = webpack(clientConfig(lang, envVariables));

  let watching;

  // Start our server webpack instance in watch mode after assets compile
  clientCompiler.plugin('done', () => {
    if (watching) return;

    // Otherwise, create a new watcher for our server code.
    watching = serverCompiler.watch(
      { quiet: true, stats: 'none' },
      stats => {}
    );
  });

  // Create a new instance of Webpack-dev-server for our client assets.
  const devServer = new WebpackDevServer(clientCompiler, devServerConfig);

  devServer.listen(settings.devServer.port, settings.devServer.host, err => {
    if (err) {
      return console.log(err);
    }
    console.log('Starting the development server...\n');
    console.log('http://localhost:' + settings.devServer.port);
  });

  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
} catch (err) {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
}
