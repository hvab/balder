import gulp from 'gulp';
import postcss from 'gulp-postcss';
import csso from 'gulp-csso';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import debug from 'gulp-debug';
import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssNested from 'postcss-nested';
import postcssUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import config from '../config.js';

// PostCSS plugins
const postcssPlugins = [
  postcssImport(),
  postcssSimpleVars(),
  postcssNested,
  postcssUrl({
    ...config.postcssUrlOptions,
    url: config.isDevelopment ? 'copy' : 'inline',
  }),
  autoprefixer({
    add: !config.isDevelopment,
  }),
  postcssReporter(),
];

/**
 * Error handler for tasks.
 * @param {string} taskName - The name of the task that caused the error.
 * @returns {Function} A function that shows a notification when an error occurs.
 */
const handleError = taskName =>
  notify.onError(err => ({
    title: taskName,
    message: err.message,
    sound: 'Blow',
  }));

/**
 * Builds CSS styles by processing them with PostCSS, applying minification in production mode,
 * and generating sourcemaps in development.
 * @returns {NodeJS.WritableStream} A stream that processes the CSS files.
 */
const buildStyles = () =>
  gulp
    .src(`${config.blocks}/*.css`, { sourcemaps: config.isDevelopment }) // Reads CSS files from the blocks directory with sourcemaps if in development
    .pipe(postcss(postcssPlugins, { to: `${config.dest}/main.css` })) // Applies PostCSS plugins to process the styles
    .on('error', handleError('PostCSS')) // Handles errors in PostCSS processing
    .pipe(gulpIf(!config.isDevelopment && config.isStylesMinify, csso())) // Minifies CSS in production if enabled
    .pipe(debug({ title: 'buildStyles:' })) // Outputs debug information about processed files
    .pipe(gulp.dest(config.dest, { sourcemaps: config.isDevelopment })); // Outputs the result to the destination folder with sourcemaps in development

export default buildStyles;
