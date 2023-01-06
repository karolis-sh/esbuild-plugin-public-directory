const os = require('os');
const path = require('path');

const dirTree = require('directory-tree');
const { build } = require('esbuild');

const publicDir = require('../lib');

const PUBLIC_DIR_ENTRY = path.join(__dirname, 'public');

const getResult = (dir, prefix = '') => {
  const input = {};
  dirTree(PUBLIC_DIR_ENTRY, null, (item, pathname, stats) => {
    input[path.join(prefix, path.relative(PUBLIC_DIR_ENTRY, pathname))] = {
      size: stats.size,
    };
  });

  const result = {};
  dirTree(dir, null, (item, pathname, stats) => {
    const key = path.relative(dir, pathname);
    if (key === path.join(prefix, 'index.js')) {
      result[key] = true;
      return;
    }

    if (!(key in input)) {
      throw new Error('Unidentified item - ' + pathname);
    }
    if (stats.size != input[key].size) {
      throw new Error('Mutated file - ' + pathname);
    }
    result[key] = 'identical';
  });

  if (Object.keys(input).length !== Object.keys(result).length - 1) {
    throw new Error(
      'Missing public files - expected ' +
        Object.keys(input) +
        ', actual ' +
        Object.keys(result),
    );
  }
  return result;
};

const TEMP_DIR = path.join(
  os.tmpdir(),
  `esbuild-plugin-public-directory/${Date.now()}`,
);

it('should use outdir option', async () => {
  const dir = path.join(TEMP_DIR, 'outdir-1');

  await build({
    entryPoints: [path.join(__dirname, 'src/index.js')],
    outdir: dir,
    plugins: [publicDir({ entry: PUBLIC_DIR_ENTRY })],
  });

  expect(getResult(dir)).toMatchSnapshot();
});

it('should respect absWorkingDir option', async () => {
  const dir = path.join(TEMP_DIR, 'absWorkingDir-1');

  await build({
    entryPoints: ['src/index.js'],
    outdir: dir,
    plugins: [publicDir()],
    absWorkingDir: __dirname,
  });

  expect(getResult(dir)).toMatchSnapshot();
});

it('should use outfile option', async () => {
  const dir = path.join(TEMP_DIR, 'outfile-1');

  await build({
    entryPoints: [path.join(__dirname, 'src/index.js')],
    outfile: path.join(dir, 'specificied/index.js'),
    plugins: [publicDir()],
    absWorkingDir: __dirname,
  });

  expect(getResult(dir, 'specificied')).toMatchSnapshot();
});
