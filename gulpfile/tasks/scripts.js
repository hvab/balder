import gulp from 'gulp';
import esbuild from 'gulp-esbuild';
import debug from 'gulp-debug';
import path from 'path';
import config from '../config.js';

/**
 * Builds JavaScript files using esbuild, bundles them, and minifies if in production.
 * @returns {NodeJS.WritableStream} A stream that processes the JavaScript files.
 */
const buildScripts = () =>
  gulp
    .src(`${config.blocks}/*.js`) // Reads JavaScript files from the blocks directory
    .pipe(
      esbuild({
        ...config.esbuildOptions,
        sourcemap: config.isDevelopment, // Generates source maps in development mode
        minify: !config.isDevelopment && config.isScriptsMinify, // Minifies in production if enabled
        plugins: [
          {
            name: 'node-modules-resolution',
            setup(build) {
              build.onResolve({ filter: /^\// }, args => {
                const cwd = process.cwd();
                const newPath = args.path.includes(cwd)
                  ? args.path
                  : path.join(cwd, 'node_modules', args.path); // Resolves module paths
                return {
                  path: newPath,
                };
              });
            },
          },
        ],
      })
    )
    .pipe(debug({ title: 'buildScripts:' })) // Outputs debug information about processed files
    .pipe(gulp.dest(config.dest)); // Outputs the result to the destination folder

export default buildScripts;
