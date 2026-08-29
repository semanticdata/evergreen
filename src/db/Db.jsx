import Config from "../../config.json"

import {normalizeWikiLinkReference, parseNoteContent} from "../utils"

const _loadNoteContent = async (note) => {
  let path = "404.md"
  if (!!note && !!note.path) {
    path = note.path
      .split("/")
      .map((k) => encodeURIComponent(k))
      .join("/")
  }
  return await fetch(`./${path}`)
}

class DB {
  _notesContent
  _notesIndex
  _noteIdsByReference

  constructor() {
    this._notesContent = {}
  }

  async _index() {
    return this._notesIndex ?? (await this.loadIndex())
  }

  async loadIndex() {
    const data = await fetch(`./${Config.index}`)
    const json = await data.json()
    this._notesIndex = json
    this._noteIdsByReference = Object.fromEntries(
      Object.entries(json).flatMap(([noteId, note]) =>
        (note.link_references ?? [noteId, ...(note.aliases ?? [])]).map(
          (reference) => [normalizeWikiLinkReference(reference), noteId],
        ),
      ),
    )
    return this._notesIndex
  }

  resolveNoteId(reference) {
    return (
      this._noteIdsByReference?.[normalizeWikiLinkReference(reference)] ??
      reference
    )
  }

  async _getOrLoadNote(noteId) {
    const index = await this._index()
    const resolvedNoteId = this.resolveNoteId(noteId)
    if (resolvedNoteId in this._notesContent)
      return this._notesContent[resolvedNoteId]
    const indexEntry = index[resolvedNoteId]
    const response = await _loadNoteContent(indexEntry)
    const {content, metadata} = parseNoteContent(await response.text())
    const noteWithContent = {
      ...indexEntry,
      id: resolvedNoteId,
      content,
      metadata,
      notFound: !indexEntry,
    }
    this._notesContent[resolvedNoteId] = noteWithContent
    return noteWithContent
  }

  async getNote(noteId) {
    return await this._getOrLoadNote(noteId)
  }

  async getAllNotes() {
    const index = await this._index()
    return await Promise.all(
      Object.keys(index).map((noteId) => this.getNote(noteId)),
    )
  }
}

const singletonDB = new DB()

export default singletonDB
