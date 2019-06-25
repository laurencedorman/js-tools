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
  definePlatform,
  ignoreAssets,
} = require('./plugins');

const settings = require('./settings');

const env = process.env.NODE_ENV || 'none';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';

module.exports = ({ platform }) => {
  const platformName = platform.name.toLowerCase();

  return {
    mode: env,
    target: 'node',
    watch: isDevEnv,
    devtool: isProdEnv ? 'source-map' : isDevEnv && 'cheap-module-source-map',
    entry: settings.entryServer,
    output: {
      path: settings.appServerOutput,
      filename: 'index.js',
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
      definePlatform(platform),
      extractCss(platformName),
      ignorePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      // Ignore assets.json to avoid infinite recompile bug
      isDevEnv && ignoreAssets(),
    ].filter(Boolean),
    resolve: settings.resolve,
    performance: false,
  };
};
