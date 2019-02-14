# PostCSS

- This package contains the manomano PostCSS configuration. It uses the manomano browserslist package `@manomano/browserslist`.

- this package exports a webpack loader preconfigured to work with the postcss configuration

```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: require.resolve('@manomano/postcss/webpack-loader'),
    },
  ],
}
```

