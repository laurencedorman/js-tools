process.on('unhandledRejection', err => {
  throw err;
});

process.env.IS_SERVER = true;

const webpack = require('webpack');
const webpackConfig = require('../config-ssr');
const { platforms } = require('../settings');

try {
  const argv = process.argv.slice(2);
  const parsedArgs = require('minimist')(argv); // eslint-disable-line import/order

  const { platform } = parsedArgs;

  const selectedPlatform = platforms.find(({ name }) => name === platform);

  const compiler = webpack(
    webpackConfig({
      platform: selectedPlatform,
    })
  );

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log('webpack watching SSR files...');
  });
} catch (e) {
  if (e && e.message) {
    console.log(e.message);
  }
  process.exit(1);
}
