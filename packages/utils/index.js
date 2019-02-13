'use strict';

const projectPkg = require('./getProjectPackageJson');
const composeObjectValues = require('./composeObjectValues');

module.exports = {
  pkg: projectPkg,
  composeObjectValues,
};
