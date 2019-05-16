# Macgyver

- Command Line Interface that bootstraps a project according to the manomano front configuration.

By default, the entry point is `src/index.js` and anything inside `public` folder will be bundled.

The generated output will be placed inside `build` folder.

# Available commands

- start

```json
{
  "scripts": {
    "start": "macgyver start"
  }
}
```

This command starts the dev environment.

- build

```json
{
  "scripts": {
    "build": "macgyver build"
  }
}
```

This command builds the web application.

- test

```json
{
  "scripts": {
    "test": "macgyver test"
  }
}
```

This command runs all the tests of the application, using your **jest.config.js** or **@manomano/jest-config** by default.

- rollup

```json
{
  "scripts": {
    "build:lib": "macgyver rollup"
  }
}
```

This command builds the packages in order to be published.
