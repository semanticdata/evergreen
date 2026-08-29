/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {formatNoteDate, noteToMarkdownContent, useBase} from "../utils"
import Db from "../db/Db"

import ReactMarkdown from "react-markdown"
import Footer from "./Footer"
import LightBulb from "./LightBulb"
import NoteLink from "./NoteLink"

import "./NoteContainer.scss"

const NoteMetadata = ({metadata = {}}) => {
  const {created, updated, tags = []} = metadata

  if (!created && !updated && tags.length === 0) return null

  return (
    <div className="NoteMetadata">
      {(created || updated) && (
        <div className="NoteDates">
          {created && (
            <time dateTime={created}>Created {formatNoteDate(created)}</time>
          )}
          {updated && (
            <time dateTime={updated}>Updated {formatNoteDate(updated)}</time>
          )}
        </div>
      )}
      {tags.length > 0 && (
        <div className="NoteTags" aria-label="Tags">
          {tags.map((tag) => (
            <Link
              className="NoteTag"
              key={tag}
              to={`/tags/${encodeURIComponent(tag)}`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const NoteContainer = ({
  style,
  verticalMode,
  overlay,
  note,
  noteIdsStack,
  scrollToNote,
  showPopoverForNote,
}) => {
  const [noteContent, setNoteContent] = useState("Loading...")

  const base = useBase()

  useEffect(() => {
    if (note.content === undefined) return
    setNoteContent(
      noteToMarkdownContent(base, note, (id) => Db.resolveNoteId(id)),
    )
  }, [note, base])

  useEffect(() => {
    scrollToNote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={`NoteContainer ${overlay ? "Overlay" : ""}`} style={style}>
      <div
        className="PresentedNote"
        style={{opacity: verticalMode ? 0 : undefined}}
      >
        <div className="NoteContainer" onScroll={() => showPopoverForNote()}>
          <div className="PrimaryNote">
            <NoteMetadata metadata={note.metadata} />
            <div
              style={{
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div className="MarkdownContainer">
                <ReactMarkdown
                  components={{
                    a: ({...props}) => (
                      <NoteLink
                        href={props.href}
                        openNoteId={note.id}
                        noteIdsStack={noteIdsStack}
                        scrollToNote={scrollToNote}
                        showPopoverForNote={showPopoverForNote}
                        text={props.children[0]}
                      />
                    ),
                  }}
                >
                  {noteContent}
                </ReactMarkdown>
                {note.notFound && <LightBulb />}
              </div>
            </div>
          </div>
          <Footer
            note={note}
            showPopoverForNote={showPopoverForNote}
            noteIdsStack={noteIdsStack}
            scrollToNote={scrollToNote}
          />
        </div>
      </div>
      {verticalMode ? (
        <div className="ObscuredLabel">{note?.title}</div>
      ) : (
        <></>
      )}
    </main>
  )
}

export default NoteContainer
