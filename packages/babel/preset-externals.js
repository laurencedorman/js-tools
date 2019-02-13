'use strict';

const env = require('@babel/preset-env');
const pluginTransformRuntime = require('@babel/plugin-transform-runtime');
const pluginClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginDynamicImport = require('babel-plugin-dynamic-import-node');

const browserlist = require('@manomano/browserlist');

module.exports = function preset(api) {
  api.assertVersion(7);

  const targets = api.env('test') ? { node: 'current' } : { browsers: browserlist };

  const presets = [
    [
      env,
      {
        exclude: ['transform-typeof-symbol'],
        ignoreBrowserlistConfig: true,
        modules: false,
        targets,
        useBuiltIns: false,
      },
    ],
  ];

  const plugins = [
    [
      pluginTransformRuntime,
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        absoluteRuntime: require.resolve('@babel/runtime'),
      },
    ],
    pluginClassProperties,
    pluginDynamicSyntax,
  ].filter(Boolean);

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  };
};

