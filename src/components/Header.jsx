import {useBase} from "../utils"

import Config from "../../config.json"

import "./Header.scss"

const Header = () => {
  const base = useBase()

  return (
    <header id="header">
      <h1>{Config.title}</h1>
      {(Config.bookmarks ?? []).map((noteIndex) => (
        <a
          key={noteIndex}
          className="noteLink"
          href={
            noteIndex === "Home" ? `${base}/` : `${base}/${encodeURIComponent(noteIndex)}`
          }
        >
          {noteIndex}
        </a>
      ))}
    </header>
  )
}

export default Header
