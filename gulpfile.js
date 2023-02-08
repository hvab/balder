// Gulp
import gulp from 'gulp';

// Tools
import { deleteAsync } from 'del';
import debug from 'gulp-debug';
import flatten from 'gulp-flatten';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import path from 'path';

// CSS
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssReporter from 'postcss-reporter';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssUrl from 'postcss-url';

// JS
import esbuild from 'gulp-esbuild';

// HTML
import nunjucks from 'gulp-nunjucks-html';
import posthtml from 'gulp-posthtml';
import posthtmlAltAlways from 'posthtml-alt-always';
import posthtmlMinifier from 'posthtml-minifier';
import typograf from 'gulp-typograf';

// Browser Sync
import browserSync from 'browser-sync';

// Config
// eslint-disable-next-line
import config from './config.js';

const {
  src, dest, series, parallel, watch,
} = gulp;
browserSync.create();

// NODE_ENV
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// Styles Task
export const buildStyles = () => src(`${config.blocks}/*.css`, { sourcemaps: isDevelopment })
  .pipe(
    postcss(
      [
        postcssImport(),
        postcssSimpleVars(),
        postcssNested,
        postcssUrl({
          url: isDevelopment ? 'copy' : 'inline',
          maxSize: 14,
          fallback: 'copy',
          optimizeSvgEncode: true,
        }),
        autoprefixer({
          add: !isDevelopment,
        }),
        postcssReporter(),
      ],
      {
        to: `${config.dest}/main.css`,
      },
    ),
  )
  .on(
    'error',
    notify.onError((err) => ({
      title: 'PostCSS',
      message: err.message,
      sound: 'Blow',
    })),
  )
  .pipe(gulpIf(!isDevelopment && config.isStylesMinify, csso()))
  .pipe(debug({ title: 'buildStyles:' }))
  .pipe(dest(config.dest, { sourcemaps: isDevelopment }));

// Scripts Task
export const buildScripts = () => src(`${config.blocks}/*.js`)
  .pipe(
    esbuild({
      sourcemap: isDevelopment,
      target: 'es2015',
      bundle: true,
      minify: !isDevelopment && config.isScriptsMinify,
      plugins: [
        {
          name: 'node-modules-resolution',
          setup(build) {
            build.onResolve({ filter: /^\// }, (args) => {
              const cwd = process.cwd();
              const newPath = args.path.includes(cwd) ? args.path : path.join(cwd, 'node_modules', args.path);
              return {
                path: newPath,
              };
            });
          },
        },
      ],
    }),
  )
  .pipe(debug({ title: 'buildScripts:' }))
  .pipe(dest(config.dest));

// HTML Task
export const buildHtml = () => src(`${config.pages}/**/*.html`)
  .pipe(
    nunjucks({
      searchPaths: ['./'],
    }),
  )
  .on(
    'error',
    notify.onError((err) => ({
      title: 'Nunjucks',
      message: err.message,
      sound: 'Blow',
    })),
  )
  .pipe(gulpIf(config.isTypograf, typograf(config.typografOptions)))
  .pipe(gulpIf(!isDevelopment, posthtml([posthtmlAltAlways()])))
  .pipe(
    gulpIf(
      !isDevelopment && config.isHtmlMinify,
      posthtml([posthtmlMinifier(config.htmlMinifyOptions)]),
    ),
  )
  .pipe(flatten())
  .pipe(debug({ title: 'buildHtml:' }))
  .pipe(dest(config.dest));

// Assets Task
export const buildAssets = () => src(`${config.assets}/**/*.*`)
  .pipe(debug({ title: 'buildAssets:' }))
  .pipe(dest(config.dest));

// Clean Task
export const clean = () => deleteAsync(`${config.dest}/*`);

// Serve Task
export const serve = (cb) => {
  browserSync.init({
    server: config.dest,
    port: isDevelopment ? 3000 : 8080,
    notify: false,
    open: false,
    ui: false,
    tunnel: false,
  });

  browserSync
    .watch([
      `${config.dest}/**/*.*`,
      `!${config.dest}/**/*.+(css|css.map)`,
    ])
    .on('change', browserSync.reload);

  browserSync.watch(`${config.dest}/**/*.css`, (event) => {
    if (event === 'change') {
      browserSync.reload(`${config.dest}/**/*.css`);
    }
  });

  cb();
};

// Watch
export const watcher = (cb) => {
  watch(`${config.blocks}/**/*.css`, buildStyles);
  watch(`${config.blocks}/**/*.js`, buildScripts);
  watch(`${config.assets}/**/*.*`, buildAssets);
  watch(
    [`${config.pages}/**/*.html`, `${config.templates}/**/*.html`],
    buildHtml,
  );
  cb();
};

// Build Task
export const build = series(
  clean,
  parallel(buildStyles, buildScripts, buildHtml, buildAssets),
);

// Develop Default Task
export default series(
  clean,
  parallel(buildStyles, buildScripts, buildHtml, buildAssets),
  parallel(watcher, serve),
);
