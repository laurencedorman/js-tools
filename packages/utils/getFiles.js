'use strict';

const fs = require('fs');

module.exports = (dir, options = { extension: '.js' }) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(name => name.endsWith(options.extension))
    : null;
