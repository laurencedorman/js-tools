'use strict';

const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const pluginTransformRuntime = require('@babel/plugin-transform-runtime');
const pluginClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginModuleResolver = require('babel-plugin-module-resolver');
const pluginObjectRest = require('@babel/plugin-proposal-object-rest-spread');
const pluginDynamicSyntax = require('@babel/plugin-syntax-dynamic-import');
const pluginReactRemoveProps = require('babel-plugin-transform-react-remove-prop-types');
const pluginDynamicImport = require('babel-plugin-dynamic-import-node');

const browserslist = require('@manomano/browserslist');
const { alias } = require('@manomano/project-settings');

module.exports = function preset(api) {
  api.assertVersion(7);

  const targets = api.env('test') ? { node: 'current' } : { browsers: browserslist };

  const presets = [
    [
      env,
      {
        debug: false,
        exclude: ['transform-typeof-symbol'],
        targets,
        useBuiltIns: 'usage',
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
        useESModules: api.env('development') || api.env('production'),
      },
    ],
    [
      pluginClassProperties,
      {
        loose: true,
      },
    ],
    [
      pluginModuleResolver,
      {
        alias,
      },
    ],
    [
      pluginObjectRest,
      {
        useBuiltIns: true
      },
    ],
    pluginDynamicSyntax,
    api.env('production') && [
      pluginReactRemoveProps,
      {
        removeImport: true,
      },
    ],
    api.env('test') && [
      pluginDynamicImport
    ],
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
