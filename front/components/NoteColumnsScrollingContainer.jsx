import {useRef} from "react"

import NoteColumnsContainer from "./NoteColumnsContainer"

import "./NoteColumnsScrollingContainer.scss"

const NoteColumnsScrollingContainer = () => {
  const scrollingContainerRef = useRef(null)

  return (
    <main ref={scrollingContainerRef} className="NoteColumnsScrollingContainer">
      <NoteColumnsContainer scrollRef={scrollingContainerRef} />
    </main>
  )
}

export default NoteColumnsScrollingContainer
