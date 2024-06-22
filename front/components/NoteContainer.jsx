/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import {useBase, noteToMarkdownContent} from "../utils"

import ReactMarkdown from "react-markdown"
import Footer from "./Footer"
import NoteLink from "./NoteLink"

import "./NoteContainer.scss"

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
    setNoteContent(noteToMarkdownContent(base, note))
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
        <div className="NoteContainer">
          <div className="PrimaryNote">
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
