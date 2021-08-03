# esbuild-plugin-public-directory

[![npm version][package-version-badge]][package-version]
[![Node.js CI](https://github.com/karolis-sh/esbuild-plugin-public-directory/actions/workflows/node.js.yml/badge.svg)](https://github.com/karolis-sh/esbuild-plugin-public-directory/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/license-mit-yellow.svg)](https://opensource.org/licenses/MIT)

Static assets directory implementation for [esbuild](https://esbuild.github.io/)
pipeline.

## Installation

```bash
npm i esbuild-plugin-public-directory -D
```

or

```bash
yarn add esbuild-plugin-public-directory --dev
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

[package-version-badge]: https://badge.fury.io/js/esbuild-plugin-public-directory.svg
[package-version]: https://www.npmjs.com/package/esbuild-plugin-public-directory
