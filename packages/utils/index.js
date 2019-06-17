const projectPkg = require('./getProjectPackageJson');
const composeObjectValues = require('./composeObjectValues');
const getFiles = require('./getFiles');
const manoConfig = require('./getManoConfig');
const downloadTranslations = require('./downloadTranslations');
const gitlab = require('./gitlab');

module.exports = {
  composeObjectValues,
  downloadTranslations,
  getFiles,
  gitlab,
  manoConfig,
  pkg: projectPkg,
};
