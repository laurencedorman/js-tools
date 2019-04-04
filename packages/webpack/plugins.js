const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('@manomano/postcss/parser');
const WebpackBar = require('webpackbar');

const StartServerPlugin = require('start-server-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const settings = require('./settings');

const manifestPlugin = (filename = 'manifest.json') => {
  const options = {
    filename,
    basePath: settings.basePath + '/',
    map: file => {
      file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
      return file;
    },
  };

  return new ManifestPlugin(options);
};

const htmlPlugin = (env, tpl = '') =>
  new HtmlPlugin(
    Object.assign(
      {
        filename: tpl.substr(tpl.lastIndexOf('/') + 1),
        template: tpl,
        inject: true,
      },
      env === 'production'
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
    )
  );

const hotModule = () => new webpack.HotModuleReplacementPlugin();

const terserPlugin = () =>
  new TerserPlugin({
    terserOptions: {
      parse: { ecma: 8 },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: { safari10: true },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    parallel: true,
    cache: true,
    sourceMap: true,
  });

const imageMin = () =>
  new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    gifsicle: {
      optimizationLevel: 9,
    },
    pngquant: {
      quality: '75',
    },
    plugins: [imageminMozjpeg({ quality: '75' })],
  });

const definePlugin = definitions => new webpack.DefinePlugin(definitions);

const extractCss = lang =>
  new MiniCssExtractPlugin({
    filename: `css/[name].[contenthash:8].${lang}.css`,
    chunkFilename: `css/[name].[contenthash:8].chunk.${lang}.css`,
  });

const ignorePlugin = () => new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

const bundleAnalyzer = () => new BundleAnalyzerPlugin();

const optimizeCss = () =>
  new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      parser: safePostCssParser,
      map: {
        inline: false,
        annotation: true,
      },
    },
  });

const defineLang = lang =>
  new webpack.DefinePlugin({
    __LANG__: JSON.stringify(lang),
  });

const hashedModuleIdsPlugin = () => new webpack.HashedModuleIdsPlugin();

const webpackBar = ({ name, color }) =>
  new WebpackBar({
    color,
    name,
  });

const ignoreAssets = () =>
  new webpack.WatchIgnorePlugin([settings.appManifest]);

const assetsPlugin = path =>
  new AssetsPlugin({
    path,
    filename: 'assets.json',
  });

const startServer = name =>
  new StartServerPlugin({
    name,
    // suppress errors to console
    nodeArgs: ['-r', 'source-map-support/register'],
  });

const envPlugin = envVariables => {
  const stringifiedEnvs = Object.keys(envVariables).reduce((acc, key) => {
    if (key.startsWith('PRIVATE_')) return acc;
    return {
      ...acc,
      [`process.env.${key}`]: JSON.stringify(envVariables[key]),
    };
  }, {});
  return new webpack.DefinePlugin(stringifiedEnvs);
};

module.exports = {
  assetsPlugin,
  manifestPlugin,
  htmlPlugin,
  hotModule,
  terserPlugin,
  imageMin,
  definePlugin,
  extractCss,
  ignorePlugin,
  bundleAnalyzer,
  optimizeCss,
  defineLang,
  hashedModuleIdsPlugin,
  webpackBar,
  ignoreAssets,
  startServer,
  envPlugin,
};
