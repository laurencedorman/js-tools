const path = require('path');
const fs = require('fs');
const { path: translationsPath } = require('./phraseApp');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('dist'),
  appClient: resolveApp('client'),
  appDirectory,
  appHtml: resolveApp('public/index.html'),
  appManifest: resolveApp('dist/assets.json'),
  appPublic: resolveApp('public'),
  appServer: resolveApp('server'),
  appServerOutput: resolveApp('server-dist'),
  appSrc: resolveApp('src'),
  appTranslations: path.join(resolveApp('src'), translationsPath),
  jestConfig: resolveApp('jest.config.js'),
  setupProxy: resolveApp('setupProxy.js'),
  testsSetup: resolveApp('setupTests.js'),
};
