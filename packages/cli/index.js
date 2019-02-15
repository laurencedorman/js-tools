#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('cross-spawn');
const args = process.argv.slice(2);

const runScript = (nodeArgs, scriptPath, args) => {
  const result = spawn.sync('node', nodeArgs.concat(scriptPath).concat(args), {
    stdio: 'inherit',
  });
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
};

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'start' || x === 'test' || x === 'rollup'
);

if (scriptIndex === -1) {
  console.log("Unknown script '" + args[0] + "'");
  process.exit();
}

const script = args[scriptIndex];

const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
const extraArgs = args.slice(scriptIndex + 1);

if (script === 'test') {
  runScript(
    nodeArgs,
    require.resolve('@manomano/jest-config/scripts/index.js'),
    extraArgs
  );
} else if (script === 'rollup') {
  runScript(
    nodeArgs,
    require.resolve('@manomano/rollup-config/scripts/index.js'),
    extraArgs
  );
} else if (script === 'start') {
  runScript(
    nodeArgs,
    require.resolve('@manomano/webpack/scripts/start.js'),
    extraArgs
  );
} else if (script === 'build') {
  runScript(
    nodeArgs,
    require.resolve('@manomano/webpack/scripts/build.js'),
    extraArgs
  );
}
