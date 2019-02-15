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

const settings = require('./settings');

const manifestPlugin = (filename = 'manifest.json') => {
  const options = {
    filename,
    basePath: settings.basePath,
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

const extractCss = () =>
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
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

module.exports = {
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
};
