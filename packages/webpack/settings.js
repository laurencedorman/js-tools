const path = require('path');
const deepmerge = require('deepmerge');
const { pkg } = require('@manomano/utils');
const { paths, alias, languages } = require('@manomano/project-settings');

const projectSettings = pkg && pkg.webpack ? pkg.webpack : {};

const defaultSettings = {
  appSrc: paths.appSrc,
  appHtml: paths.appHtml,
  appPublic: paths.appPublic,
  appBuild: paths.appBuild,
  basePath: paths.appDirectory,
  entry: path.resolve(paths.appSrc, 'index'),
  output: {
    filename: 'main',
    chunkFilename: '[name].chunk',
    publicPath: '/',
    path: paths.appBuild,
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
  languages: languages || ['fr'],
  globals: pkg.globals || {},
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
};

module.exports = deepmerge(defaultSettings, projectSettings);
