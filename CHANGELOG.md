# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.5](https://git.manomano.tech/core-utils/js-tools/compare/v2.4.4...v2.4.5) (2019-05-23)


### Bug Fixes

* **webpack:** deleted entry related to SSR + removed from config assetPlugins used by SSR ([d1b1cfe](https://git.manomano.tech/core-utils/js-tools/commits/d1b1cfe))





## [2.4.4](https://git.manomano.tech/core-utils/js-tools/compare/v2.4.3...v2.4.4) (2019-05-23)


### Bug Fixes

* **webpack:** removed port in webpack dev server address when used with docker container ([ffa9a95](https://git.manomano.tech/core-utils/js-tools/commits/ffa9a95))





## [2.4.3](https://git.manomano.tech/core-utils/js-tools/compare/v2.4.2...v2.4.3) (2019-05-23)


### Bug Fixes

* **webpack:** fix SSL error when trying to load webpack dev server assets when required from manomano-sf in docker env ([cc02b43](https://git.manomano.tech/core-utils/js-tools/commits/cc02b43))





## [2.4.2](https://git.manomano.tech/core-utils/js-tools/compare/v2.4.1...v2.4.2) (2019-05-22)

**Note:** Version bump only for package js-tools





## [2.4.1](https://git.manomano.tech/core-utils/js-tools/compare/v2.4.0...v2.4.1) (2019-05-22)


### Bug Fixes

* **webpack:** fix template not workin on dev. ([4a8720e](https://git.manomano.tech/core-utils/js-tools/commits/4a8720e))





# [2.4.0](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.5...v2.4.0) (2019-05-21)


### Features

* **webpack:** generate an index file for each supported platform ([020a212](https://git.manomano.tech/core-utils/js-tools/commits/020a212))





## [2.3.5](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.4...v2.3.5) (2019-05-21)


### Bug Fixes

* **packages:** remove files field in package.json as it is unuseful ([831c63b](https://git.manomano.tech/core-utils/js-tools/commits/831c63b))





## [2.3.4](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.3...v2.3.4) (2019-05-21)


### Bug Fixes

* **alias:** Add default alias ([184b0f7](https://git.manomano.tech/core-utils/js-tools/commits/184b0f7))





## [2.3.3](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.2...v2.3.3) (2019-05-16)


### Bug Fixes

* **cli:** macgyver test needs jestConfig path ([17dbace](https://git.manomano.tech/core-utils/js-tools/commits/17dbace))





## [2.3.2](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.1...v2.3.2) (2019-05-15)


### Bug Fixes

* **cli:** magyver test is now using jest.config.js if it exists or @manomano/jest-config by default ([a39ea3f](https://git.manomano.tech/core-utils/js-tools/commits/a39ea3f))





## [2.3.1](https://git.manomano.tech/core-utils/js-tools/compare/v2.3.0...v2.3.1) (2019-05-15)


### Bug Fixes

* **webpack:** Lowercase platform names ([8057001](https://git.manomano.tech/core-utils/js-tools/commits/8057001))





# [2.3.0](https://git.manomano.tech/core-utils/js-tools/compare/v2.2.1...v2.3.0) (2019-05-14)


### Features

* **webpack:** Add platform to the bundle process ([6fe71eb](https://git.manomano.tech/core-utils/js-tools/commits/6fe71eb))





## [2.2.1](https://git.manomano.tech/core-utils/js-tools/compare/v2.2.0...v2.2.1) (2019-05-13)


### Bug Fixes

* **webpack:** Fix css error on server ([c603a9e](https://git.manomano.tech/core-utils/js-tools/commits/c603a9e))





# [2.2.0](https://git.manomano.tech/core-utils/js-tools/compare/v2.1.2...v2.2.0) (2019-05-07)


### Features

* **webpack:** create multiple manifests by lang ([66017c5](https://git.manomano.tech/core-utils/js-tools/commits/66017c5))





## [2.1.2](https://git.manomano.tech/core-utils/js-tools/compare/v2.1.1...v2.1.2) (2019-05-06)

**Note:** Version bump only for package js-tools





## [2.1.1](https://git.manomano.tech/core-utils/js-tools/compare/v2.1.0...v2.1.1) (2019-05-02)

**Note:** Version bump only for package js-tools





# [2.1.0](https://git.manomano.tech/core-utils/js-tools/compare/v2.0.1...v2.1.0) (2019-04-25)


### Features

* **webpack:** Fix reload 404 using SPA ([71fd05f](https://git.manomano.tech/core-utils/js-tools/commits/71fd05f))





## [2.0.1](https://git.manomano.tech/core-utils/js-tools/compare/v2.0.0...v2.0.1) (2019-04-24)


### Bug Fixes

* **webpack:** Use aggregateTimeout for polling ([6d6ac10](https://git.manomano.tech/core-utils/js-tools/commits/6d6ac10))





# [2.0.0](https://git.manomano.tech/core-utils/js-tools/compare/v0.0.25...v2.0.0) (2019-04-23)


### Bug Fixes

* **lerna:** allow only master ([c2381eb](https://git.manomano.tech/core-utils/js-tools/commits/c2381eb))


### Features

* **ci:** add ci on js-tools ([49b142f](https://git.manomano.tech/core-utils/js-tools/commits/49b142f))
* **ci:** add semantic release on js-tools ([03d0878](https://git.manomano.tech/core-utils/js-tools/commits/03d0878))
* **jest:** reset mocks for each tests by default ([bef22b4](https://git.manomano.tech/core-utils/js-tools/commits/bef22b4))
* **webpack:** add polling for docker ([149f32f](https://git.manomano.tech/core-utils/js-tools/commits/149f32f))


### BREAKING CHANGES

* **ci:** JS-Tools is now deployed automatically on master
* **ci:** JS-Tools is now deployed automatically on master





## [1.0.21](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.20...v1.0.21) (2019-04-18)


### Bug Fixes

* **dept:** upgrade dept ([14d03df](https://git.manomano.tech/core-utils/js-tools/commits/14d03df))





## [1.0.20](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.19...v1.0.20) (2019-04-17)


### Bug Fixes

* **ci:** no ci that runs another ci ([2ff0260](https://git.manomano.tech/core-utils/js-tools/commits/2ff0260))





## [1.0.19](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.18...v1.0.19) (2019-04-17)

**Note:** Version bump only for package js-tools





## [1.0.18](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.17...v1.0.18) (2019-04-17)


### Bug Fixes

* **ci:** last bump check ([a41f6ac](https://git.manomano.tech/core-utils/js-tools/commits/a41f6ac))
* **ci:** typo in lerna version command ([ca9acb4](https://git.manomano.tech/core-utils/js-tools/commits/ca9acb4))





## [1.0.17](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.16...v1.0.17) (2019-04-17)

**Note:** Version bump only for package js-tools

## [1.0.16](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.15...v1.0.16) (2019-04-17)

**Note:** Version bump only for package js-tools

## [1.0.15](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.14...v1.0.15) (2019-04-17)

**Note:** Version bump only for package js-tools

## [1.0.14](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.13...v1.0.14) (2019-04-17)

**Note:** Version bump only for package js-tools

## [1.0.13](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.12...v1.0.13) (2019-04-17)

### Bug Fixes

- **ci:** upgrade every repository ([42d2232](https://git.manomano.tech/core-utils/js-tools/commits/42d2232))

## [1.0.12](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.11...v1.0.12) (2019-04-17)

### Bug Fixes

- **ci:** upgrade yarn.lock ([dad1796](https://git.manomano.tech/core-utils/js-tools/commits/dad1796))

## [1.0.11](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.10...v1.0.11) (2019-04-17)

**Note:** Version bump only for package js-tools

## [1.0.10](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.9...v1.0.10) (2019-04-17)

### Bug Fixes

- **ci:** install standard-version ([1215d92](https://git.manomano.tech/core-utils/js-tools/commits/1215d92))

## [1.0.9](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.8...v1.0.9) (2019-04-17)

### Bug Fixes

- **ci:** add npmrc just before publishing ([eb6cd3f](https://git.manomano.tech/core-utils/js-tools/commits/eb6cd3f))
- **ci:** lerna publish will be last command ([18068ba](https://git.manomano.tech/core-utils/js-tools/commits/18068ba))
- **ci:** use standard version instead of semantic release ([8c28e84](https://git.manomano.tech/core-utils/js-tools/commits/8c28e84))

## [1.0.8](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.7...v1.0.8) (2019-04-17)

### Bug Fixes

- **ci:** delete git tag on ci ([5b281e1](https://git.manomano.tech/core-utils/js-tools/commits/5b281e1))

## [1.0.7](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.6...v1.0.7) (2019-04-16)

### Bug Fixes

- **ci:** delete tag before semantic-release ([0aae71b](https://git.manomano.tech/core-utils/js-tools/commits/0aae71b))

## [1.0.6](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.5...v1.0.6) (2019-04-16)

### Bug Fixes

- **ci:** publish and semantic release together ([5e56e65](https://git.manomano.tech/core-utils/js-tools/commits/5e56e65))
- **ci:** remove yarn lock to update them ([613ba2d](https://git.manomano.tech/core-utils/js-tools/commits/613ba2d))
- **ci:** use yarn install lerna to update every package ([dac2e1e](https://git.manomano.tech/core-utils/js-tools/commits/dac2e1e))

## [1.0.5](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.4...v1.0.5) (2019-04-16)

### Bug Fixes

- **ci:** try yarn bootstrap instead of yarn install + run test and lint ([20e0658](https://git.manomano.tech/core-utils/js-tools/commits/20e0658))
- **ci:** upgrade yarn lock + pull branch before semantic release ([df07cd6](https://git.manomano.tech/core-utils/js-tools/commits/df07cd6))

## [1.0.4](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.3...v1.0.4) (2019-04-16)

### Bug Fixes

- **ci:** use semantic release git ([ad6e6ac](https://git.manomano.tech/core-utils/js-tools/commits/ad6e6ac))

## [1.0.3](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.2...v1.0.3) (2019-04-16)

### Bug Fixes

- **ci:** no need to remove branch on pipeline, since master is protected ([bedab0f](https://git.manomano.tech/core-utils/js-tools/commits/bedab0f))
- **ci:** use semantic release to upgrade version of main packages ([7a1c6d9](https://git.manomano.tech/core-utils/js-tools/commits/7a1c6d9))

## [1.0.2](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.0...v1.0.2) (2019-04-15)

### Bug Fixes

- **ci:** generate changelog will happen after publishing ([f8fe482](https://git.manomano.tech/core-utils/js-tools/commits/f8fe482))

## [1.0.1](https://git.manomano.tech/core-utils/js-tools/compare/v1.0.0...v1.0.1) (2019-04-15)

### Bug Fixes

- **changelog:** clean changelog ([a850fb6](https://git.manomano.tech/core-utils/js-tools/commits/a850fb6))
- **ci:** use conventional commits to upgrade version ([b4d8656](https://git.manomano.tech/core-utils/js-tools/commits/b4d8656))

# [1.0.0](https://git.manomano.tech/core-utils/js-tools/compare/v0.0.25...v1.0.0) (2019-04-12)

### Features

- **ci:** add ci on js-tools ([49b142f](https://git.manomano.tech/core-utils/js-tools/commits/49b142f))
- **ci:** add semantic release on js-tools ([729f45c](https://git.manomano.tech/core-utils/js-tools/commits/729f45c))

### BREAKING CHANGES

- **ci:** JS-Tools is now deployed automatically on master
