const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

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
  extractCss,
  ignorePlugin,
  defineLang,
  ignoreAssets,
  webpackBar,
  hotModule,
  startServer,
} = require('./plugins');

const settings = require('./settings');

const env = process.env.NODE_ENV || 'none';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';

module.exports = lang => {
  return {
    mode: env,
    target: 'node',
    watch: isDevEnv,
    externals: [
      nodeExternals({
        whitelist: [
          isDevEnv ? 'webpack/hot/poll?300' : null,
          /.(scss|css)$/,
          ...settings.transpileExternalLibraries,
        ].filter(Boolean),
      }),
    ],
    devtool: isProdEnv ? 'source-map' : isDevEnv && 'cheap-module-source-map',
    entry: [
      'webpack/hot/poll?300',
      '@manomano/webpack/utils/prettyNodeErrors',
      settings.entryServer,
    ],
    output: {
      path: settings.appServerOutput,
      filename: 'app.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          oneOf: [
            babelLoader,
            babelModuleLoader,
            css(env, true),
            cssModule(env, true),
            sass(env, true),
            sassModule(env, true),
            fontLoader,
            svgLoader,
            fileLoader,
          ],
        },
      ],
    },

    plugins: [
      defineLang(lang),
      extractCss(lang),
      ignorePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      isDevEnv && hotModule(),
      isDevEnv && startServer('app.js'),
      // Ignore assets.json to avoid infinite recompile bug
      isDevEnv && ignoreAssets(),
      isDevEnv &&
        webpackBar({
          color: '#c065f4',
          name: 'server',
        }),
    ].filter(Boolean),
    resolve: settings.resolve,
    performance: false,
  };
};
