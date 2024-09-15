import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks-html';
import posthtml from 'gulp-posthtml';
import posthtmlAltAlways from 'posthtml-alt-always';
import posthtmlMinifier from 'posthtml-minifier';
import typograf from 'gulp-typograf';
import flatten from 'gulp-flatten';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import debug from 'gulp-debug';
import config from '../config.js';

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
 * Builds HTML files using Nunjucks templating engine, processes them with PostHTML plugins,
 * applies Typograf if enabled, flattens the file structure, and saves the result in the destination folder.
 * @returns {NodeJS.WritableStream} A stream that processes the HTML files.
 */
const buildHtml = () =>
  gulp
    .src(`${config.pages}/**/*.html`) // Reads all HTML files from the pages directory
    .pipe(
      nunjucks({
        searchPaths: ['./'], // Sets the root path for Nunjucks templates
      })
    )
    .on('error', handleError('Nunjucks')) // Handles errors in Nunjucks processing
    .pipe(gulpIf(config.isTypograf, typograf(config.typografOptions))) // Applies Typograf if enabled in config
    .pipe(
      gulpIf(
        !config.isDevelopment && config.isHtmlMinify, // Minifies HTML and applies PostHTML plugins in production
        posthtml([
          posthtmlAltAlways(),
          posthtmlMinifier(config.htmlMinifyOptions),
        ])
      )
    )
    .pipe(flatten()) // Flattens the folder structure
    .pipe(debug({ title: 'buildHtml:' })) // Outputs debug information
    .pipe(gulp.dest(config.dest)); // Outputs the result to the destination folder

export default buildHtml;
