'use strict';

const {
  babelLoader,
  babelModuleLoader,
  css,
  cssModule,
  sass,
  sassModule,
  fileLoader,
} = require('./loaders');

const {
  manifestPlugin,
  htmlPlugin,
  hotModule,
  terserPlugin,
  optimizeCss,
  definePlugin,
  extractCss,
  ignorePlugin,
  imageMin,
} = require('./plugins');

const settings = require('./settings');

const env = process.env.NODE_ENV || 'none';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';

const baseConfig = {
  mode: env,
  bail: isProdEnv,
  devtool: isProdEnv ? 'source-map' : isDevEnv && 'eval-source-map',
  entry: [
    isDevEnv && `${require.resolve('webpack-dev-server/client')}?/`,
    isDevEnv && require.resolve('webpack/hot/dev-server'),
    settings.entry,
  ].filter(Boolean),
  output: {
    path: isProdEnv ? settings.output.path : undefined,
    pathinfo: isDevEnv,
    filename: isProdEnv
      ? `js/${settings.output.filename}.[contenthash:8].js`
      : `${settings.output.filename}.js`,
    chunkFilename: isProdEnv
      ? `js/${settings.output.chunkFilename}.[chunkhash:8].js`
      : `${settings.output.chunkFilename}.js`,
    publicPath: settings.output.publicPath,
  },
  optimization: {
    minimize: isProdEnv,
    minimizer: [terserPlugin(), optimizeCss()],
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: true,
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          babelLoader,
          babelModuleLoader,
          css(env),
          cssModule(env),
          sass(env),
          sassModule(env),
          fileLoader,
        ],
      },
    ],
  },
  plugins: [
    imageMin(),
    htmlPlugin(env, settings.appHtml),
    definePlugin(settings.globals),
    isDevEnv && hotModule(),
    isProdEnv && manifestPlugin(),
    isProdEnv && extractCss(),
    ignorePlugin(),
  ].filter(Boolean),
  resolve: settings.resolve,
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false,
};

module.exports = baseConfig;
