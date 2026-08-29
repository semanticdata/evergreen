import {Link} from "react-router-dom"

import Config from "../../config.json"

import "./Header.scss"

const Header = () => {
  return (
    <header id="header">
      <h1>{Config.title}</h1>
      {(Config.bookmarks ?? []).map((noteIndex) => (
        <Link
          key={noteIndex}
          className="noteLink"
          to={noteIndex === "Home" ? "/" : `/${encodeURIComponent(noteIndex)}`}
        >
          {noteIndex}
        </Link>
      ))}
      <Link className="noteLink" to="/tags">
        Tags
      </Link>
    </header>
  )
}

export default Header
