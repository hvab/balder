# Balder

## Project Description

**Balder** is a build setup for frontend development using Gulp. It is designed to speed up and simplify the development process by providing ready-made configurations for working with CSS, JavaScript, HTML templates, and automating tasks like minification, building, and browser reloading.

## Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/hvab/balder.git
cd balder
npm install
```

## Environment Setup

Before starting, create a `.env` file by copying it from `.env.example`:

```bash
cp .env.example .env
```

In the `.env` file, you can set environment variables to control build behavior.

## Usage

### Development with Live Server

Start the project in development mode with a local server and automatic reload:

```sh
npm start
```

### Production Build

Build the project for production with minification and optimization settings:

```sh
npm run build
```

### Running Server Separately

If you need to run only the local server without rebuilding the project:

```sh
npm run serve
```

## Project Structure

- `blocks/` — Directory containing blocks with CSS and JS files.
- `assets/` — Static files of the project (images, fonts, etc.).
- `templates/` — Nunjucks templates for reusable components.
- `pages/` — Project pages that will be compiled into final HTML files.
- `gulpfile/` — Gulp configurations and tasks for building the project.
- `dist/` — Directory where the project is built.
- `.env` — File with environment variables.
- `package.json` — File with project dependencies and settings.

## Configuration

The configuration file `config.js` is located in the `gulpfile/` directory and contains the main project settings.

```javascript
export default {
  dest: 'dist', // Build destination
  blocks: 'blocks', // Blocks with styles and scripts
  assets: 'assets', // Static files
  templates: 'templates', // Nunjucks templates
  pages: 'pages', // HTML pages
  isDevelopment,
  isStylesMinify: process.env.STYLES_MINIFY === 'true', // Minify styles
  isScriptsMinify: process.env.SCRIPTS_MINIFY === 'true', // Minify scripts
  isTypograf: true, // Use Typograf for HTML
  typografOptions: {
    locale: ['ru', 'en-US'],
    mode: 'digit',
  },
  isHtmlMinify: false, // Minify HTML
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
```

### Environment Variables

In the `.env` file, you can set the following variables:

- `NODE_ENV` — Build mode (`development` or `production`).
- `STYLES_MINIFY` — Minify styles (`true` or `false`).
- `SCRIPTS_MINIFY` — Minify scripts (`true` or `false`).

**Example `.env` file:**

```
NODE_ENV=development
STYLES_MINIFY=true
SCRIPTS_MINIFY=true
```

## Configuration Files

### `package.json`

Contains project information and dependency list. Important scripts:

- `"start"`: Starts the project in development mode.
- `"build"`: Builds the project for production.
- `"serve"`: Runs the local server without rebuilding.

### `jsconfig.json`

Used by editors (like VSCode) to configure JavaScript project settings for better code navigation, IntelliSense, and module handling.

- `"module": "ESNext"`: Configures the project to use modern ES module syntax (`import`/`export`).
- `"target": "ES2020"`: Specifies the JavaScript version (ES2020) to ensure modern features are supported.
- `"exclude"`: Excludes certain directories (e.g., `node_modules`) from being processed by the editor.

### `.ncurc`

Used by `npm-check-updates` (ncu) to configure which packages should be ignored or managed during dependency updates.

- `"reject": ["eslint"]`: Ensures that the `eslint` package will not be updated to maintain compatibility with other project dependencies.

## Additional Dependencies

- **Gulp**: Task runner for automating build tasks.
- **PostCSS**: Tool for transforming CSS with JavaScript plugins.
- **Esbuild**: Fast bundler for JavaScript and TypeScript code.
- **BrowserSync**: Automatically reloads the browser when files change.
- **Nunjucks**: Templating engine for generating HTML pages.
