process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('cross-spawn');
const configPath = require.resolve('../index.js');

const rollupPath = require.resolve('../node_modules/.bin/rollup');

spawn.sync('node', [rollupPath, '-c', '--config', configPath], {
  stdio: 'inherit',
});
