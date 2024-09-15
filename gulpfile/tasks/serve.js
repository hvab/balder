import browserSync from 'browser-sync';
import config from '../config.js';

const bs = browserSync.create();

// BrowserSync settings
const browserSyncConfig = {
  ...config.browserSyncOptions,
  server: config.dest,
  port: config.isDevelopment ? 3000 : 8080,
};

/**
 * Initializes the BrowserSync server and sets up file watching for automatic browser reloads.
 * @param {Function} cb - A callback function to signal task completion.
 */
const serve = cb => {
  bs.init(browserSyncConfig); // Initializes the server with the provided configuration

  // Watches for changes in all files except CSS files and reloads the browser on change
  bs.watch([`${config.dest}/**/*.*`, `!${config.dest}/**/*.+(css|css.map)`]).on(
    'change',
    bs.reload
  );

  // Watches for changes in CSS files and reloads the browser when a change occurs
  bs.watch(`${config.dest}/**/*.css`, event => {
    if (event === 'change') {
      bs.reload(`${config.dest}/**/*.css`);
    }
  });

  cb(); // Signals that the task is complete
};

export default serve;
