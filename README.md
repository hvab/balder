# balder

## Install

```sh
npm i
```

## Config

```js
export default {
  dest: 'dist',               // Build destination
  blocks: 'blocks',           // Blocks with styles and scripts
  assets: 'assets',           // Static files
  templates: 'templates',     // HTML templates with nunjucks
  pages: 'pages',             // HTML templates for pages
  isTypograf: true,           // Typografing HTML
  typografOptions: {          // Typograf options
    locale: ['ru', 'en-US'],
    mode: 'digit',
  },
  isHtmlMinify: false,        // Minify HTML
  htmlMinifyOptions: {        // HTML minify options
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: false,
  },
  isStylesMinify: true,       // Minify styles
  isScriptsMinify: true,      // Minify scripts
};
```

## Usage

Developing with serve

```sh
npm start # gulp
```

Production build

```sh
npm run build # NODE_ENV=production gulp build
```

Serve

```sh
gulp serve
```
