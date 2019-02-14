const fs = require('fs');

const { paths, extensions } = require('@manomano/project-settings');

const setupFilesAfterEnv = fs.existsSync(paths.testsSetup)
  ? [paths.testsSetup]
  : undefined;

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  resolver: require.resolve('jest-pnp-resolver'),
  setupFilesAfterEnv: setupFilesAfterEnv,
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  testEnvironment: require.resolve('./environment.js'),
  testURL: 'http://localhost',
  rootDir: process.cwd(),
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./jsTransform.js'),
    '^.+\\.css$': require.resolve('./cssTransform.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve(
      './fileTransform.js'
    ),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': require.resolve('identity-obj-proxy'),
    '\\.(css|scss)$': require.resolve('identity-obj-proxy'),
  },
  moduleFileExtensions: extensions,
};
