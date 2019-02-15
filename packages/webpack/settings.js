const path = require('path');
const { pkg, composeObjectValues } = require('@manomano/utils');
const { paths, alias } = require('@manomano/project-settings');

const projectSettings = pkg && pkg.webpack ? pkg.webpack : {};

const settings = composeObjectValues(projectSettings, x =>
  path.resolve(process.cwd(), x)
);

const defaultSettings = {
  appSrc: paths.appSrc,
  appHtml: paths.appHtml,
  appPublic: paths.appPublic,
  appBuild: paths.appBuild,
  basePath: paths.appDirectory,
  entry: path.resolve(paths.appSrc, 'index'),
  output: {
    filename: 'main.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: paths.appBuild,
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
  globals: pkg.globals || {},
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 80,
  },
};

module.exports = {
  ...defaultSettings,
  ...settings,
};
