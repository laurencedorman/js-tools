'use strict';

const path = require('path');

module.exports = require(path.join(process.cwd(), 'package.json')) || {};
