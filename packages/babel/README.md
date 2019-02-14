# Babel

- This package contains the manomano babel presets as well as a webpack babel loader already configured to work with the presets.

- This configuration can be extendend in package.json by adding

```json
{
  "babel": {
    "presets": ["@manomano/babel"]
  }
}
```

- or directly in your babel.rc file

```json
{
  "presets": ["@manomano/babel"]
}
```

If you use webpack, you can use the already configured babel loader as such

```js
{
  test: /\.js$/,
  use: require.resolve('@manomano/babel/webpack-loader'),
}
```
