const os = require('os');
const path = require('path');
const { build } = require('esbuild');
const dirTree = require('directory-tree');

const publicDir = require('../lib');

const getResult = (dir) => {
  const result = [];
  dirTree(dir, null, (item, pathname, stats) => {
    result.push({ file: path.relative(dir, pathname), size: stats.size });
  });
  return result;
};

const TEMP_DIR = path.join(os.tmpdir(), `esbuild-plugin-public-directory/${Date.now()}`);

it('should use outdir option', async () => {
  const dir = path.join(TEMP_DIR, 'outdir-1');

  await build({
    entryPoints: [path.join(__dirname, 'src/index.js')],
    outdir: dir,
    plugins: [publicDir({ entry: path.join(__dirname, 'public') })],
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
    outfile: path.join(dir, 'specificied/sample.js'),
    plugins: [publicDir()],
    absWorkingDir: __dirname,
  });

  expect(getResult(dir)).toMatchSnapshot();
});
