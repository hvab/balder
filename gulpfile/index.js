import { series, parallel } from 'gulp';
import clean from './tasks/clean.js';
import buildStyles from './tasks/styles.js';
import buildScripts from './tasks/scripts.js';
import buildHtml from './tasks/html.js';
import buildAssets from './tasks/assets.js';
import serve from './tasks/serve.js';
import watcher from './tasks/watcher.js';

/**
 * Builds the project by cleaning the destination folder and running parallel tasks to process styles, scripts, HTML, and assets.
 * @returns {Function} A Gulp task that builds the project.
 */
export const build = series(
  clean,
  parallel(buildStyles, buildScripts, buildHtml, buildAssets)
);

/**
 * Default task that first builds the project and then starts the file watcher and local development server.
 * @returns {Function} A Gulp task that builds the project, starts the watcher, and runs the development server.
 */
export default series(build, parallel(watcher, serve));

// Export the `serve` task so it can be run independently
export { serve };
