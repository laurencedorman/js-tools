const JSDomEnv = require('jest-environment-jsdom');

module.exports = class CustomJSDomEnv extends JSDomEnv {
  constructor(config) {
    super(config);
    this.global.jsdom = this.dom;
  }

  teardown() {
    this.global.jsdom = null;
    return super.teardown();
  }
};
