const path = require('path');
const fs = require('fs');
const { path: translationsPath } = require('./phraseApp');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  appServer: resolveApp('server'),
  appServerOutput: resolveApp('build'),
  appManifest: resolveApp('dist/assets.json'),
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('setupTests.js'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appTranslations: path.join(resolveApp('src'), translationsPath),
};
