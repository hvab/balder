import gulp from 'gulp';
import config from '../config.js';
import buildStyles from './styles.js';
import buildScripts from './scripts.js';
import buildHtml from './html.js';
import buildAssets from './assets.js';

/**
 * Watches for changes in files and triggers the appropriate tasks (styles, scripts, HTML, assets).
 */
const watcher = () => {
  gulp.watch(`${config.blocks}/**/*.css`, buildStyles); // Watch for changes in CSS files
  gulp.watch(`${config.blocks}/**/*`, buildScripts); // Watch for changes in JS files
  gulp.watch(`${config.assets}/**/*.*`, buildAssets); // Watch for changes in asset files
  gulp.watch(
    [`${config.pages}/**/*.html`, `${config.templates}/**/*.html`],
    buildHtml // Watch for changes in HTML and template files
  );
};

export default watcher;
