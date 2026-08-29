import {useEffect, useMemo, useState} from "react"
import {Link, useParams} from "react-router-dom"

import Header from "../components/Header"
import Db from "../db/Db"
import {formatNoteDate} from "../utils"

import "./Tags.scss"

const Tags = () => {
  const {tag} = useParams()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const selectedTag = tag?.toLowerCase()

  useEffect(() => {
    Db.getAllNotes().then((loadedNotes) => {
      setNotes(loadedNotes)
      setLoading(false)
    })
  }, [])

  const tagCounts = useMemo(() => {
    return notes.reduce((counts, note) => {
      for (const noteTag of note.metadata.tags) {
        counts[noteTag] = (counts[noteTag] ?? 0) + 1
      }
      return counts
    }, {})
  }, [notes])

  const matchingNotes = useMemo(() => {
    if (!selectedTag) return []
    return notes
      .filter((note) => note.metadata.tags.includes(selectedTag))
      .sort((left, right) => left.title.localeCompare(right.title))
  }, [notes, selectedTag])

  useEffect(() => {
    document.title = selectedTag ? `#${selectedTag}` : "Tags"
  }, [selectedTag])

  return (
    <main className="TagsPage">
      <Header />
      <section className="TagsContent">
        <h1>{selectedTag ? `#${selectedTag}` : "Tags"}</h1>
        {loading ? (
          <p>Loading tags...</p>
        ) : (
          <>
            {Object.keys(tagCounts).length > 0 ? (
              <nav className="TagCloud" aria-label="All tags">
                {Object.entries(tagCounts)
                  .sort(([left], [right]) => left.localeCompare(right))
                  .map(([noteTag, count]) => (
                    <Link
                      className={`TagCloudLink ${noteTag === selectedTag ? "active" : ""}`}
                      key={noteTag}
                      to={`/tags/${encodeURIComponent(noteTag)}`}
                    >
                      #{noteTag} <span>{count}</span>
                    </Link>
                  ))}
              </nav>
            ) : (
              <p>No tags have been added yet.</p>
            )}
            {selectedTag && (
              <section
                className="TaggedNotes"
                aria-labelledby="tagged-notes-heading"
              >
                <h2 id="tagged-notes-heading">Notes</h2>
                {matchingNotes.length > 0 ? (
                  <ul>
                    {matchingNotes.map((note) => (
                      <li key={note.id}>
                        <Link to={`/${encodeURIComponent(note.id)}`}>
                          {note.title}
                        </Link>
                        {note.metadata.created && (
                          <time dateTime={note.metadata.created}>
                            {formatNoteDate(note.metadata.created)}
                          </time>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No notes use this tag.</p>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Tags
