# Macgyver

- Command Line Interface that bootstraps a project according to the manomano front configuration.

By default, the entry point is `src/index.js` and anything inside `public` folder will be bundled.

The generated output will be placed inside `build` folder.

# Available commands

## start

```json
{
  "scripts": {
    "start": "macgyver start"
  }
}
```

## start-server

```json
{
  "scripts": {
    "start:server": "macgyver start-server"
  }
}
```

## build

```json
{
  "scripts": {
    "build": "macgyver build"
  }
}
```

### `options`

```
  --analyze               Analyze the generated bundle.
  --platform           Sets the current platform. Must correspond with one platform name inside manoconfig.platforms

```

## test

```json
{
  "scripts": {
    "test": "macgyver test"
  }
}
```

This command runs all the tests of the application, using your **jest.config.js** or **@manomano/jest-config** by default.

## rollup

```json
{
  "scripts": {
    "build:lib": "macgyver rollup"
  }
}
```

This command builds the packages in order to be published.
