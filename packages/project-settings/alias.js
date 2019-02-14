const path = require('path');
const { pkg, composeObjectValues } = require('@manomano/utils');

const defaultAlias = {
  components: 'src/components',
  modules: 'src/modules',
  shapes: 'src/shapes',
  contexts: 'src/contexts',
  services: 'src/services',
  utils: 'src/utils',
};

const manoConfig = pkg.manoConfig || {};
const projectAlias = manoConfig.alias || {};

const updater = entry => path.resolve(process.cwd(), entry);

module.exports = {
  ...composeObjectValues(defaultAlias, updater),
  ...composeObjectValues(projectAlias, updater),
};
