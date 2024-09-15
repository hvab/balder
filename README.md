# balder

## Install

```sh
npm i
```

## Config

```js
export default {
  dest: 'dist', // Build destination
  blocks: 'blocks', // Blocks with styles and scripts
  assets: 'assets', // Static files
  templates: 'templates', // HTML templates with nunjucks
  pages: 'pages', // HTML templates for pages
  isTypograf: true, // Typografing HTML
  typografOptions: {
    // Typograf options
    locale: ['ru', 'en-US'],
    mode: 'digit',
  },
  isHtmlMinify: false, // Minify HTML
  htmlMinifyOptions: {
    // HTML minify options
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: false,
  },
  isStylesMinify: true, // Minify styles
  isScriptsMinify: true, // Minify scripts
};
```

## Usage

Developing with serve

```sh
npm start
```

Production build

```sh
npm run build
```

Serve

```sh
gulp serve
```

## Files

### `jsconfig.json`

`jsconfig.json` is used by the editor (like VSCode) to configure JavaScript project settings for better code navigation, IntelliSense, and module handling.

- `"module": "ESNext"`: Configures the project to use modern ES module syntax (import/export).
- `"target": "ES2020"`: Specifies the JavaScript version (ES2020) to ensure modern features like optional chaining and nullish coalescing are supported.
- `"exclude"`: Excludes certain directories from being processed by the editor (e.g., node_modules) to avoid unnecessary performance overhead.

### `.ncurc`

`.ncurc` is used by npm-check-updates (ncu) to configure which packages should be ignored or managed during dependency updates.

- `"reject": ["eslint"]`: Ensures that the eslint package will not be updated to maintain compatibility with other project dependencies.
