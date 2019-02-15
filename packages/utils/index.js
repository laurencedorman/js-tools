'use strict';

const projectPkg = require('./getProjectPackageJson');
const composeObjectValues = require('./composeObjectValues');
const getFiles = require('./getFiles');

module.exports = {
  pkg: projectPkg,
  composeObjectValues,
  getFiles,
};
