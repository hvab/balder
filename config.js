export default {
  dest: 'dist',
  blocks: 'blocks',
  assets: 'assets',
  templates: 'templates',
  pages: 'pages',
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
  isStylesMinify: true,
  isScriptsMinify: true,
};
