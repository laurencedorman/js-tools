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
  defineLang,
  hashedModuleIdsPlugin,
} = require('./plugins');

const settings = require('./settings');

const env = process.env.NODE_ENV || 'none';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';

module.exports = lang => {
  return {
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
        ? `js/${settings.output.filename}.[contenthash:8].${lang}.js`
        : `${settings.output.filename}.js`,
      chunkFilename: isProdEnv
        ? `js/${settings.output.chunkFilename}.[chunkhash:8].${lang}.js`
        : `${settings.output.chunkFilename}.js`,
      publicPath: settings.output.publicPath,
    },
    optimization: {
      minimize: isProdEnv,
      minimizer: [terserPlugin(), optimizeCss()],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 10000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
            chunks: 'all',
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: 'single',
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
      defineLang(lang),
      imageMin(),
      htmlPlugin(env, settings.appHtml),
      definePlugin(settings.globals),
      isDevEnv && hotModule(),
      isProdEnv && manifestPlugin(),
      isProdEnv && extractCss(lang),
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
};
