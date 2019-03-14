'use strict';

const env = require('@babel/preset-env');
const pluginTransformRuntime = require('@babel/plugin-transform-runtime');
const pluginClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginDynamicSyntax = require('@babel/plugin-syntax-dynamic-import');

const browserslist = require('@manomano/browserslist-config');

module.exports = function preset(api) {
  api.assertVersion(7);

  const targets = api.env('test')
    ? { node: 'current' }
    : { browsers: browserslist };

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
