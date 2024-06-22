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

This repository is a fork of [unstaticlabs/evergreen-notes-markdown-website](https://github.com/unstaticlabs/evergreen-notes-markdown-website). Thanks to their authors: Roger Miret Giné, and Valentin Viennot.

The project is inspired by Andy Matuschak, Max Stoiber, and Anne-Laure Le Cunff.

## © License

Source code in this repository is available under the [MIT License](LICENSE)
