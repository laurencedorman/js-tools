# Prettier

- This package contains the manomano prettier configuration.

- This configuration can be extendend by adding `.prettierrc.js` or `prettier.config.js` file on the root project.

```js
// prettier.config.js or .prettierrc.js
const manoConfig = require('@manomano/prettier-config');
const overrides = {};
module.exports = {
  ...manoConfig,
  ...overrides,
};
```

More info can be found in [Prettier docs](https://prettier.io/docs/en/options.html)
