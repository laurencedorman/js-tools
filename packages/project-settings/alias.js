const { manoConfig } = require('@manomano/utils');

const defaultAlias = {
  components: './src/components',
  contexts: './src/contexts',
  modules: './src/modules',
  pages: './src/pages',
  shapes: './src/shapes',
  services: './src/services',
  store: './src/store',
  utils: './src/utils',
};

const projectAlias = manoConfig.alias || {};

module.exports = {
  ...defaultAlias,
  ...projectAlias,
};
