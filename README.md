# 🌲 Evergreen

Yet another one of these static website to display Markdown notes (eg from an Obsidian vault) in the style of Andy Matuschak evergreen notes.

Source: [unstaticlabs/evergreen-notes-markdown-website](https://github.com/unstaticlabs/evergreen-notes-markdown-website)

## Why?

A digital garden is a way to think and build in public. This is a powerful tool to develop your thinking.

## Goals

- Make publishing and sharing notes in the Evergreen format as straightforward as possible.
- Make it an intuitive and beautiful experience for the user.

## Evergreen Notes

Evergreen notes are a convenient and natural way to organise thoughts. They are:

- Atomic
- Concept-centric
- Densely linked

## Obsidian

Obsidian is a great, simple tool to browse, edit, and organise a vault of Markdown files. With stacked tabs it provides a similar experience to this UI to linking and browsing notes. Obsidian provides an option to publish notes, but we aim to separate concerns and avoid lockin.

This website developed with React+Vite is a very simplified application to display Markdown files as stacked notes. It is greatly, heavily inspired from Andy Matuschak's notes website: <https://notes.andymatuschak.org/About_these_notes>. It requires a separate, automated process in order to build an index of backlinks.

## TODO

- [x] **mobile display**
- [ ] Fix blink (eg on Highlight open links)
- [ ] Sort index/notes by pagerank score and keep them sorted whenever displayed
- [ ] Remove broken links directly from index (?) (problem is my hidden notes will show up here)
- [x] **preview note on link hover**
- [x] preview note on "referenced by" link hover
- [x] Style referenced by links
- [x] Highlight open links
- [x] Add "referenced by" card at the bottom of each note
- [x] Fix (?) 404 when entrypoint is e.g. `note1.1`
- [x] e2e pipeline (i.e. builduing index.json, building react, serving as Github Pages)
- [x] add config (to change title, where notes are stored...) / anything that is hard-coded
- [x] links dont work
- [x] handle link formats
- [x] handle broken links
- [x] actual links don't work
- [x] replace "scroll" console.log and implement scroll when clicking a link
- [x] MANY requests for same file + lazyloading
- [x] Debugger %25 (et scroll?)
- [x] default index
- [x] click bookmark doesnt't work
- [x] links to this note empty?
- [x] empty page: 404?

Icebox

- [ ] Support links to blocks
- [ ] Note index array --> show menu?
