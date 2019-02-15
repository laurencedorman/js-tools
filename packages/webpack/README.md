# webpack

This package includes manomano webpack configuration, which can be found in the `config.js` file. It's heavily inspired from create-react-app.

## Scripts

- The package exposes a start script (`/scripts/start.js`), which will automatically boot a webpack dev server

- The package exposes a build script (`/scripts/build.js`), which will bundle your app

## Configuration

The package works out of the box.
you can add your own webpack configuration if you like directly in your project's package.json file under the `webpack` entry.

```json
"webpack": {
  "entry": "my-custom-project/index.js",
}
```
