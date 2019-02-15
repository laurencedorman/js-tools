# Macgyver

- Cli interface that bootstrap the manomano configuration.

By default the entrypoint is `src/index.js` and anything inside `public` folder will be bundled.

the output is will be placed inside `build` folder.

# Available commands

- start

```json
{
  "scripts": {
    "start": "macgyver start"
  }
}
```

This command starts the dev envrionment.

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

- rollup

```json
{
  "scripts": {
    "build:lib": "macgyver rollup"
  }
}
```
