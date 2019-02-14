const { createTransformer } = require("babel-jest");

module.exports = createTransformer({
  presets: [require.resolve("@manomano/babel")],
  babelrc: false,
  configFile: false
});
