const glob = require('glob');
const path = require('path');
const reactIntl = require('babel-plugin-react-intl');
const babel = require('@babel/core');

const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const pluginClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginModuleResolver = require('babel-plugin-module-resolver');
const pluginDynamicSyntax = require('@babel/plugin-syntax-dynamic-import');
const flow = require('@babel/preset-flow');
const { alias, paths } = require('@manomano/project-settings');

const isProd = process.env.NODE_ENV === 'production';

const PHRASE_APP_TRANSLATION = glob.sync(`${paths.appTranslations}/*.json`);

const extractTranslations = file => {
  const result = babel.transformFileSync(file, {
    presets: [[env, { targets: { node: 'current' } }], react, flow],
    plugins: [
      [pluginClassProperties, { loose: true }],
      [pluginModuleResolver, { alias }],
      pluginDynamicSyntax,
      [reactIntl, { extractSourceLocation: true }],
    ],
  });

  return result.metadata['react-intl'].messages;
};

module.exports = {
  getTranslations(filePath) {
    const keysExtracted = extractTranslations(filePath);
    if (keysExtracted.length === 0) return;

    return PHRASE_APP_TRANSLATION.map(languagePath => {
      const language = path.basename(languagePath, '.json');
      const langTranslations = require(languagePath);

      const translations = keysExtracted.reduce((acc, key) => {
        if (isProd && langTranslations[key.id] == null) {
          throw new Error(
            `Missing translation for key -> ${key.id} At ${filePath}:${
              key.start.line
            }:${key.start.column}`
          );
        }
        return {
          ...acc,
          [key.id]: langTranslations[key.id],
        };
      }, {});

      return {
        language,
        translations,
      };
    });
  },
};