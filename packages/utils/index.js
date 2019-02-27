const projectPkg = require('./getProjectPackageJson');
const composeObjectValues = require('./composeObjectValues');
const getFiles = require('./getFiles');
const manoConfig = require('./getManoConfig');
const downloadTranslations = require('./downloadTranslations');

module.exports = {
  pkg: projectPkg,
  manoConfig,
  composeObjectValues,
  getFiles,
  downloadTranslations,
};
