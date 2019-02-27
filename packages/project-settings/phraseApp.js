const { manoConfig } = require('@manomano/utils');

const phraseApp = manoConfig.phraseApp || {};

module.exports = {
  ...phraseApp,
  path: phraseApp.path || 'translations',
};
