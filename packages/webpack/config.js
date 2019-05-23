'use strict';

const {
  babelLoader,
  babelModuleLoader,
  css,
  cssModule,
  sass,
  sassModule,
  fontLoader,
  svgLoader,
  fileLoader,
} = require('./loaders');

const {
  assetsPlugin,
  manifestPlugin,
  htmlPlugin,
  hotModule,
  terserPlugin,
  optimizeCss,
  definePlugin,
  extractCss,
  ignorePlugin,
  imageMin,
  definePlatform,
  hashedModuleIdsPlugin,
  webpackBar,
  envPlugin,
} = require('./plugins');

const settings = require('./settings');

const env = process.env.NODE_ENV || 'none';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';
const dockerContainerAddress =
  process.env.DOCKER_CONTAINER_ADDRESS ||
  `http://localhost:${settings.devServer.port}`;

module.exports = (platform, envVariables = {}) => {
  const platformName = platform.name.toLowerCase();

  return {
    mode: env,
    bail: isProdEnv,
    devtool: isProdEnv ? 'source-map' : isDevEnv && 'cheap-module-source-map',
    entry: [
      isDevEnv &&
        `${require.resolve(
          'webpack-dev-server/client'
        )}?${dockerContainerAddress}/`,
      isDevEnv && require.resolve('react-dev-utils/webpackHotDevClient'),
      settings.entry,
    ].filter(Boolean),
    output: {
      path: isProdEnv ? settings.output.path : undefined,
      pathinfo: isDevEnv,
      filename: isProdEnv
        ? `js/${settings.output.filename}.[contenthash:8].${platformName}.js`
        : `${settings.output.filename}.js`,
      chunkFilename: isProdEnv
        ? `js/${settings.output.chunkFilename}.[chunkhash:8].${platformName}.js`
        : `${settings.output.chunkFilename}.js`,
      publicPath: isProdEnv
        ? settings.output.publicPath
        : `http://localhost:${settings.devServer.port}/`,
      jsonpFunction: 'rootAppWebpackJsonp',
    },
    optimization: {
      minimize: isProdEnv,
      minimizer: [terserPlugin(), optimizeCss()],
      splitChunks: isProdEnv
        ? {
            chunks: 'all',
            minSize: 20000,
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
          }
        : {
            cacheGroups: {
              default: false,
            },
          },
      runtimeChunk: isProdEnv ? 'single' : false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            babelLoader,
            babelModuleLoader,
            css(env, false),
            cssModule(env, false),
            sass(env, false),
            sassModule(env, false),
            fontLoader,
            svgLoader,
            fileLoader,
          ],
        },
      ],
    },
    plugins: [
      hashedModuleIdsPlugin(),
      definePlatform(platform),
      imageMin(),
      htmlPlugin(env, settings.appHtml, platformName),
      definePlugin(settings.globals),
      isDevEnv && hotModule(),
      isProdEnv && manifestPlugin(platformName),
      isProdEnv && extractCss(platformName),
      ignorePlugin(),
      isDevEnv &&
        webpackBar({
          color: '#f56be2',
          name: 'client',
        }),
      assetsPlugin(settings.appBuild),
      envPlugin(envVariables),
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
