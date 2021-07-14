import path from 'path';
import fse from 'fs-extra';
import chokidar from 'chokidar';
import { Plugin } from 'esbuild';

import { Options } from './interface';

export default ({ entry = 'public' }: Options = {}): Plugin => ({
  name: 'public-directory',
  async setup(build) {
    const outdir: string =
      build.initialOptions.outdir || path.basename(build.initialOptions.outfile || '');

    build.onStart(async () => {
      if (build.initialOptions.watch) {
        const watcher = chokidar.watch(entry);

        const copy = (filename: string) =>
          fse.copy(filename, path.join(outdir, path.relative(entry, filename)));

        watcher
          .on('add', copy)
          .on('change', copy)
          .on('unlink', (filename) => fse.remove(filename));
      } else {
        await fse
          .access(entry)
          .then(() => fse.copy(entry, outdir))
          .catch(() => undefined);
      }
    });
  },
});
