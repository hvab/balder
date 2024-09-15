import gulp from 'gulp';
import debug from 'gulp-debug';
import config from '../config.js';

/**
 * Task to copy all assets from the source directory to the destination directory.
 * @returns {NodeJS.WritableStream} A stream that processes the assets and outputs them to the destination.
 */
const buildAssets = () =>
  gulp
    .src(`${config.assets}/**/*.*`)
    .pipe(debug({ title: 'buildAssets:' })) // Outputs debug information about processed files
    .pipe(gulp.dest(config.dest)); // Copies the assets to the destination folder

export default buildAssets;
