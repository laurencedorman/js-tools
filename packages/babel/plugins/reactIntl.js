const dependencyTree = require('dependency-tree');
const { join } = require('path');
const { paths } = require('@manomano/project-settings');

const { getTranslations } = require('../helpers');

const hasWithTranslations = callee =>
  callee.node && callee.node.name === 'withTranslations';

const flatArr = arr => [].concat(...arr);

const isProd = process.env.NODE_ENV === 'production';

module.exports = ({ types }) => {
  return {
    visitor: {
      CallExpression(path, state) {
        if (!hasWithTranslations(path.get('callee'))) return;
        if (path.node.arguments.length > 1) return;

        // In case withTranslations(<Component />) only have one argument
        // This adds the translations as second parameter.

        if (isProd) {
          const { filename, root } = state.file.opts;

          const dependencies = dependencyTree.toList({
            filename,
            directory: root,
            // This need to be a path to a file.
            webpackConfig: join(__dirname, './config.js'),
            filter: dependencyPath => {
              if (/\.(scss|sass)$/.test(dependencyPath)) return false;

              return !dependencyPath.includes('node_modules');
            },
          });

          const translations = flatArr(
            dependencies
              .map(filePath => getTranslations(filePath))
              .filter(e => e != null)
          ).reduce((prev, curr) => {
            if (typeof prev[curr.language] === 'undefined') {
              prev[curr.language] = {};
            }
            return {
              ...prev,
              [curr.language]: {
                ...prev[curr.language],
                ...curr.translations,
              },
            };
          }, {});

          path.node.arguments.push(
            // Adds an object as second argument
            // This object will be called with __LANG__
            // Ex -> { es: {id: trans}}[__LANG__]
            // Webpack will replace LANG at build time.
            types.memberExpression(
              types.objectExpression(
                Object.entries(translations).map(([language, translations]) =>
                  // Transform language to {[lang]: JSON}
                  // JSON type is {key: value}
                  types.objectProperty(
                    types.stringLiteral(language),
                    types.objectExpression(
                      Object.entries(translations).map(([key, value]) =>
                        types.objectProperty(
                          types.stringLiteral(key),
                          types.stringLiteral(value)
                        )
                      )
                    )
                  )
                )
              ),
              types.identifier('__LANG__'),
              true
            )
          );
        } else {
          path.node.arguments.push(
            types.callExpression(types.identifier('require'), [
              types.binaryExpression(
                '+',
                types.binaryExpression(
                  '+',
                  types.stringLiteral(`${paths.appTranslations}/`),
                  types.identifier('__LANG__')
                ),
                types.stringLiteral('.json')
              ),
            ])
          );
        }
      },
    },
  };
};
