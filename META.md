
# Meta

## config.json

- title
- index
- bookmarks

## package.json

- start: `npx index-wikilinks notes notes/index.json && npx vite`
- start-2: `rm notes/index.json && index-wikilinks notes notes/index.json && vite`
- dev: `npx vite`
- build: `npx vite build`
- build:index: `npx index-wikilinks notes notes/index.json`
- lint: `npx eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`
- preview: `npx vite preview`
- check: `npx prettier --check .`
- format: `npx prettier --write .`

## vite.config.js

- restart: `notes/**`
- build: `outDir: "_site"`
- base: `./`

## index.html

- Single Page Apps for GitHub Pages
- `<div id="root"></div>`
- `<script module src="front/main.jsx"></script>`

## main.jsx

- `./pages/Evergreen.jsx`
- `../config.json`
- `./index.scss`

## Db.jsx

- `../../config.json`

## Evergreen.jsx

- `../db/Db.jsx`
- `../components/Header`
- `../components/NoteColoumnsScrollingContainer`
- `./Evergreen.scss`

## Footer

- `..utils`
- `./Footer.scss`
- `./Notelink`

## Header

- `../utils`
- `../../config.json`
- `./Header.scss`

## Note Columns Container

- `../db/Db`
- `./NoteContainer`
- `./NoteColumnsContainer.scss`
- `NOTE_WIDTH`
  - Default: 584

## Note Columns Scrolling Container

- `./NoteColimnsContainer`
- `./NoteCoumnsScrollingContainer.scss`

## Note Container

- `../utils`
- `./Footer`
- `./Notelink`
- `./NotewContainer.scss`

## Note Link

- `../utils`
- `./NoteLink.scss`

## Popover

- `../db/Db`
- `../utils`
- `./Popover.scss`

## Movements

### `root` to `src`

- `index.html`
- `config.json`
