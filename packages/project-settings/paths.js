const path = require('path');
const fs = require('fs');
const { path: translationsPath } = require('./phraseApp');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('setupTests.js'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appTranslations: path.join(resolveApp('src'), translationsPath),
};
