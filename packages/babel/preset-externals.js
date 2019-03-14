'use strict';

const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const pluginTransformRuntime = require('@babel/plugin-transform-runtime');
const pluginClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginDynamicSyntax = require('@babel/plugin-syntax-dynamic-import');
const pluginObjectRest = require('@babel/plugin-proposal-object-rest-spread');
const pluginReactRemoveProps = require('babel-plugin-transform-react-remove-prop-types');

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
    [
      react,
      {
        development: api.env('development') || api.env('test'),
        useBuiltins: true,
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
    [
      pluginClassProperties,
      {
        loose: true,
      },
    ],
    [
      pluginObjectRest,
      {
        useBuiltIns: true,
      },
    ],
    pluginDynamicSyntax,
    api.env('production') && [
      pluginReactRemoveProps,
      {
        removeImport: true,
      },
    ],
  ].filter(Boolean);

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  };
};
