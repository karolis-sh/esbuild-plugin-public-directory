# esbuild-plugin-public-directory

[![npm version][package-version-badge]][package-version]
[![Node.js CI](https://github.com/karolis-sh/karolis-sh-esbuild-plugin-public-directory/actions/workflows/node.js.yml/badge.svg)](https://github.com/karolis-sh/karolis-sh-esbuild-plugin-public-directory/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/license-mit-yellow.svg)](https://opensource.org/licenses/MIT)

Static assets implementation for [esbuild](https://esbuild.github.io/) pipeline.

## Installation

```bash
npm i postcss esbuild-plugin-public-directory -D
```

or

```bash
yarn add postcss esbuild-plugin-public-directory --dev
```

## Usage

```js
const esbuild = require('esbuild');
const publicDir = require('esbuild-plugin-public-directory');

esbuild
  .build({
    entryPoints: ['src/index.js'],
    outdir: 'build',
    plugins: [publicDir()],
  })
  .catch(() => process.exit(1));
```

## Options

### entry

Type: `string`<br>
Default: `public`

Public directory location.

## Licence

[MIT](/LICENSE)

[package-version-badge]: https://badge.fury.io/js/esbuild-plugin-public-directory.svg
[package-version]: https://www.npmjs.com/package/esbuild-plugin-public-directory
