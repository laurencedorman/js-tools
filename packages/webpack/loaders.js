const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBabelLoader = require('@manomano/babel/webpack-loader');
const webpackBabelExternalLoader = require('@manomano/babel/webpack-external-loader');
const postCSSLoader = require('@manomano/postcss/webpack-loader');

const settings = require('./settings');

const babelLoader = {
  test: /\.jsx?$/,
  include: settings.appSrc,
  use: webpackBabelLoader,
};

const babelModuleLoader = {
  test: /\/jsx?$/,
  exclude: /@babel(?:\/|\\{1,2})runtime/,
  use: webpackBabelExternalLoader,
};

const styleRegex = /\.css$/;
const styleModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getStyleLoaders = (env, options, preprocessor) => {
  const loaders = [
    env === 'development' && require.resolve('style-loader'),
    env === 'production' && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options,
    },
    postCSSLoader,
  ].filter(Boolean);

  if (preprocessor) {
    loaders.push(require.resolve(preprocessor));
  }

  return loaders;
};

const css = env => ({
  test: styleRegex,
  exclude: styleModuleRegex,
  use: getStyleLoaders(env, {
    importLoaders: 1,
    modules: false,
  }),
  sideEffects: true,
});

const cssModule = env => ({
  test: styleModuleRegex,
  use: getStyleLoaders(env, {
    importLoaders: 1,
    modules: true,
    sourceMap: false,
    localIdentName: '[name]__[local]__[hash:base64:5]',
  }),
});

const sass = env => ({
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    env,
    {
      importLoaders: 2,
      modules: false,
    },
    'sass-loader'
  ),
  sideEffects: true,
});

const sassModule = env => ({
  test: sassModuleRegex,
  use: getStyleLoaders(
    env,
    {
      importLoaders: 2,
      modules: true,
      sourceMap: false,
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
    'sass-loader'
  ),
});

const fontLoader = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  loader: require.resolve('file-loader'),
  options: {
    name: 'fonts/[name].[hash:8].[ext]',
  },
};

const fileLoader = {
  loader: require.resolve('file-loader'),
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/[name].[hash:8].[ext]',
  },
};

module.exports = {
  babelLoader,
  babelModuleLoader,
  css,
  cssModule,
  sass,
  sassModule,
  fontLoader,
  fileLoader,
};
