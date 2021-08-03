import path from 'path';
import fse from 'fs-extra';
import chokidar from 'chokidar';
import { Plugin } from 'esbuild';

import { Options } from './interface';

const NAME = 'public-directory';

export = ({ entry = 'public' }: Options = {}): Plugin => ({
  name: NAME,
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
        let exists = false;
        try {
          await fse.access(entry);
          exists = true;
        } catch (err) {
          return { warnings: [{ pluginName: NAME, text: err.toString() }] };
        }

        if (exists) {
          await fse.ensureDir(outdir);
          await fse.copy(entry, outdir);
        }
      }
      return null;
    });
  },
});
