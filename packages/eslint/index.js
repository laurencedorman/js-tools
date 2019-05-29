const { alias, paths } = require('@manomano/project-settings');

module.exports = {
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'prettier', // Remove all the styling rules.
    'prettier/react', // Remove react specific styling rules.
  ],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: [paths.appSrc],
        alias,
      },
    },
  },
  parser: 'babel-eslint',
  plugins: ['jest'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 2, // Enforces displayName to be readable
    'consistent-return': 0, // Allow arrow functions to not return nothing.
    'no-restricted-syntax': 0, // Don't disable generators/async await syntax.
  },
};
