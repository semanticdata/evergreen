import Config from "../../config.json"

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
    return this._notesIndex
  }

  async _getOrLoadNote(noteId) {
    const index = await this._index()
    if (noteId in this._notesContent) return this._notesContent[noteId]
    const response = await _loadNoteContent(index[noteId])
    const content = await response.text()
    const noteWithContent = {...index[noteId], id: noteId, content}
    this._notesContent[noteId] = noteWithContent
    return noteWithContent
  }

  async getNote(noteId) {
    return await this._getOrLoadNote(noteId)
  }
}

const singletonDB = new DB()

export default singletonDB
