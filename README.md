# 🌲 Evergreen

> A Static Website for Displaying Markdown Notes

Yet another implementation of a static website designed to display Markdown notes in the style of Andy Matuschak's evergreen notes.

Evergreen notes are a convenient and natural way to organize thoughts. They are:

- **Atomic**: Each note is a self-contained unit.
- **Concept-centric**: Each note focuses on a single concept or idea.
- **Densely Linked**: Notes are interconnected through bi-directional links.

## Why Evergreen?

A digital garden is a powerful tool for thoughtful and creative thinking. By organizing notes in the Evergreen format, you can harness the power of this tool to develop your thinking.

## 🏁 Goals

- **Simplify Publishing and Sharing**: Make it as straightforward as possible to publish and share notes in the Evergreen format.
- **Intuitive User Experience**: Design the user interface to be intuitive and beautiful.

## Obsidian.md

[Obsidian](https://obsidian.md) is a great, simple tool to browse, edit, and organise a vault of Markdown files. With stacked tabs it provides a similar experience to this UI to linking and browsing notes. Obsidian provides an option to publish notes, but we aim to separate concerns and avoid lockin.

This website developed with React+Vite is a very simplified application to display Markdown files as stacked notes. It is greatly, heavily inspired from Andy Matuschak's notes website: [About_these_notes](https://notes.andymatuschak.org/About_these_notes). It requires a separate, automated process in order to build an index of backlinks.

## ✨ Features

- Bi-directional links
- Wiki-style Links: `[[New Page]]`
- Hover preview

## 🗺 Roadmap

### TODO

- [ ] Fix blink (eg on Highlight open links)
- [ ] Sort index/notes by pagerank score and keep them sorted whenever displayed
- [ ] Remove broken links directly from index (?) (problem is my hidden notes will show up here)
- [ ] Support links to blocks #longterm
- [ ] Note index array --> show menu? #longterm

### DONE

- [x] Mobile display
- [x] Preview note on link hover
- [x] Preview note on "referenced by" link hover
- [x] Style "referenced by" links
- [x] Highlight open links
- [x] Add "referenced by" card at the bottom of each note
- [x] Fix (?) when entrypoint is e.g. `note1.1`
- [x] End-to-end pipeline (i.e. building `index.json`, building React, serving as GitHub Pages)
- [x] Add config (to change title, where notes are stored)
- [x] Links don't work
- [x] Handle link formats
- [x] Handle broken links
- [x] Actual links don't work
- [x] Replace "scroll" console.log and implement scroll when clicking a link
- [x] Multiple requests for the same file + lazy loading
- [x] Debugger `%25` (and scroll?)
- [x] Default index
- [x] Click bookmark doesn't work
- [x] Links to this note are empty
- [x] Empty page: 404?

## 🤖 Technologies

- [Bun](https://bun.sh/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [React](https://react.dev/)
- [Sass](https://sass-lang.com/)
- [Vite](https://vitejs.dev/)

## 🔗 Relevant Links

- [Eleventy Plugin Vite](https://www.npmjs.com/package/@11ty/eleventy-plugin-vite)
  - Runs Vite as middleware in Eleventy Dev Server (see: --incremental)
- [Vite Plugin Eleventy](https://www.npmjs.com/package/vite-plugin-eleventy)
  - Use 11ty to build HTML without compiling during development.
- [Slinkity](https://www.npmjs.com/package/slinkity)
  - Unlocks component frameworks like React. (use .jsx instead of .html .liquid)
- [Vite Plugin React](https://www.npmjs.com/package/@vitejs/plugin-react)
  - Default Vite plugin for React projects.

## 💜 Attributions

This repository is a fork of [unstaticlabs/evergreen-notes-markdown-website](https://github.com/unstaticlabs/evergreen-notes-markdown-website). Thanks to their authors: [Roger Miret Giné](https://github.com/rogerxaic), and [Valentin Viennot](https://github.com/ValentinViennot).

The project is inspired by [Andy Matuschak](https://github.com/andymatuschak), [Max Stoiber](https://github.com/mxstbr), and [Anne-Laure Le Cunff](https://github.com/anthilemoon).

## © License

Source code in this repository is available under the [MIT License](LICENSE)

## Docs

### Vite

#### The `public` Directory

If you have assets that are:

- Never referenced in source code (e.g. `robots.txt`)
- Must retain the exact same file name (without hashing)
- ...or you simply don't want to have to import an asset first just to get its URL

Then you can place the asset in a special `public` directory under your project root. Assets in this directory will be served at root path `/` during dev, and copied to the root of the dist directory as-is.

The directory defaults to `<root>/public`, but can be configured via the `publicDir` [option](https://vitejs.dev/config/shared-options.html#publicdir).

Note that:

- You should always reference public assets using root absolute path - for example, public/icon.png should be referenced in source code as /icon.png.
- Assets in public cannot be imported from JavaScript.

## build.manifest

- Type: `boolean | string`
- Default: `false`
- Related: [Backend Integration](https://vitejs.dev/guide/backend-integration)

When set to true, the build will also generate a .vite/manifest.json file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name.

## Meta

### config.json

- title
- index
- bookmarks

### package.json

- start: `npx index-wikilinks notes notes/index.json && npx vite`
- start-2: `rm notes/index.json && index-wikilinks notes notes/index.json && vite`
- dev: `npx vite`
- build: `npx vite build`
- build:index: `npx index-wikilinks notes notes/index.json`
- lint: `npx eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`
- preview: `npx vite preview`
- check: `npx prettier --check .`
- format: `npx prettier --write .`

### vite.config.js

- restart: `notes/**`
- build: `outDir: "_site"`
- base: `./`

### index.html

- Single Page Apps for GitHub Pages
- `<div id="root"></div>`
- `<script module src="front/main.jsx"></script>`

### main.jsx

- `./pages/Evergreen.jsx`
- `../config.json`
- `./index.scss`

### Db.jsx

- `../../config.json`

### Evergreen.jsx

- `../db/Db.jsx`
- `../components/Header`
- `../components/NoteColoumnsScrollingContainer`
- `./Evergreen.scss`

### Footer

- `..utils`
- `./Footer.scss`
- `./Notelink`

### Header

- `../utils`
- `../../config.json`
- `./Header.scss`

### Note Columns Container

- `../db/Db`
- `./NoteContainer`
- `./NoteColumnsContainer.scss`
- `NOTE_WIDTH`
  - Default: 584

### Note Columns Scrolling Container

- `./NoteColimnsContainer`
- `./NoteCoumnsScrollingContainer.scss`

### Note Container

- `../utils`
- `./Footer`
- `./Notelink`
- `./NotewContainer.scss`

### Note Link

- `../utils`
- `./NoteLink.scss`

### Popover

- `../db/Db`
- `../utils`
- `./Popover.scss`
