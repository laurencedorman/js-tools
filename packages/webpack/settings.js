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
  entry: path.resolve(paths.appSrc, 'index'),
  entryServer: path.resolve(paths.appServer, 'index.js'),
  output: {
    filename: 'main',
    chunkFilename: '[name].chunk',
    publicPath: '/',
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
    disableHostCheck: true,
  },
  transpileExternalLibraries: [/@manomano\/toolkit/],
};

module.exports = deepmerge(defaultSettings, projectSettings);
