const { alias, paths } = require("@manomano/project-settings");

module.exports = {
  extends: ["react-app", "prettier"],
  env: {
    browser: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        root: [paths.appSrc],
        alias
      }
    },
    react: {
      version: "detect" // React version. "detect" automatically picks the version you have installed.
    }
  }
};
