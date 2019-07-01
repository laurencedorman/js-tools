const babel = require('rollup-plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcssPlugin = require('rollup-plugin-postcss');
const filesize = require('rollup-plugin-filesize');
const autoprefixer = require('autoprefixer');
const visualizer = require('rollup-plugin-visualizer');
const { extensions } = require('@manomano/project-settings');
const { pkg } = require('@manomano/utils');
const sassLoader = require('./sass-loader');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      name: pkg.name,
      sourcemap: true,
    },
  ],
  plugins: [
    visualizer(),
    postcssPlugin({
      modules: true,
      minimize: true,
      loaders: [sassLoader],
      extensions: ['.css', '.scss', '.module.scss'],
      plugins: [autoprefixer],
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: /node_modules/,
      presets: [require.resolve('@manomano/babel')],
    }),
    peerDepsExternal(),
    resolve({
      extensions: extensions.map(e => `.${e}`), // Default: [ '.mjs', '.js', '.json', '.node' ]
    }),
    commonjs(),
    filesize(),
  ],
};
