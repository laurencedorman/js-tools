const path = require('path');
const { manoConfig, composeObjectValues } = require('@manomano/utils');

const defaultAlias = {
  components: 'src/components',
  contexts: 'src/contexts',
  modules: 'src/modules',
  pages: 'src/pages',
  shapes: 'src/shapes',
  services: 'src/services',
  store: 'src/store',
  utils: 'src/utils',
};

const projectAlias = manoConfig.alias || {};

const updater = entry => path.resolve(process.cwd(), entry);

module.exports = {
  ...composeObjectValues(defaultAlias, updater),
  ...composeObjectValues(projectAlias, updater),
};
