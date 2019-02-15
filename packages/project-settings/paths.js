const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  appBuild: resolveApp('build'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('setupTests.js'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
};
