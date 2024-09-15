import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  dest: 'dist',
  blocks: 'blocks',
  assets: 'assets',
  templates: 'templates',
  pages: 'pages',
  isDevelopment,
  isStylesMinify: process.env.STYLES_MINIFY === 'true',
  isScriptsMinify: process.env.SCRIPTS_MINIFY === 'true',
  isTypograf: true,
  typografOptions: {
    locale: ['ru', 'en-US'],
    mode: 'digit',
  },
  isHtmlMinify: false,
  htmlMinifyOptions: {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: false,
  },
  browserSyncOptions: {
    notify: false,
    open: false,
    ui: false,
    tunnel: false,
    server: 'dist',
  },
  esbuildOptions: {
    target: 'es2015',
    bundle: true,
  },
  postcssUrlOptions: {
    maxSize: 14,
    fallback: 'copy',
    optimizeSvgEncode: true,
  },
};
