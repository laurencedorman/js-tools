const packageJson = require('./getProjectPackageJson');

module.exports = packageJson.manoConfig || {};
