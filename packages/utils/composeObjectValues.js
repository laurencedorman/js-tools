'use strict';

const modify = (obj, updater) =>
  Object.entries(obj).reduce((out, x) => {
    if (typeof x[1] === 'object' && x[1] !== undefined) {
      out[x[0]] = modify(updater, x[1]);
    } else if (x[1] !== undefined) {
      out[x[0]] = updater(x[1]);
    }

    return out;
  }, {});

module.exports = modify;
