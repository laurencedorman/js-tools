const path = require('path');
const deepmerge = require('deepmerge');
const { pkg, composeObjectValues } = require('@manomano/utils');
const { paths, alias, platforms } = require('@manomano/project-settings');

const projectSettings = pkg && pkg.webpack ? pkg.webpack : {};

const defaultSettings = {
  appSrc: paths.appSrc,
  appHtml: paths.appHtml,
  appPublic: paths.appPublic,
  appBuild: paths.appBuild,
  appManifest: paths.appManifest,
  appServer: paths.appServer,
  appServerOutput: paths.appServerOutput,
  basePath: paths.appDirectory,
  entrySSR: path.resolve(paths.appServer, 'client.js'),
  entrySPA: path.resolve(paths.appClient, 'index.js'),
  entryServer: path.resolve(paths.appServer, 'index.js'),
  protocol: process.env.PROTOCOL ? process.env.PROTOCOL : 'http://',
  output: {
    filename: 'main',
    chunkFilename: '[name].chunk',
    publicPath: '/',
    devPublicPath:
      process.env.WEBPACK_DEV_SERVER_HOST ||
      `localhost:${process.env.PORT ? process.env.PORT : 3000}/`,
    path: paths.appBuild,
  },
  resolve: {
    alias: composeObjectValues(alias, entry =>
      path.resolve(process.cwd(), entry)
    ),
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
  platforms,
  globals: pkg.globals || {},
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    sockHost: process.env.WEBPACK_DEV_SERVER_HOST || 'localhost',
    disableHostCheck: true,
    public: process.env.WEBPACK_DEV_SERVER_PUBLIC || 'localhost',
  },
  transpileExternalLibraries: [/@manomano\/toolkit/],
};

module.exports = deepmerge(defaultSettings, projectSettings);
