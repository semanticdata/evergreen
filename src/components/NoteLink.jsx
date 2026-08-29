/* eslint-disable react/prop-types */
import {useCallback} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"

import {useBase} from "../utils"

import "./NoteLink.scss"

const isLinkRemote = (href) =>
  new URL(document.baseURI).origin !== new URL(href, document.baseURI).origin

const NoteLink = ({
  href,
  text,
  openNoteId,
  noteIdsStack,
  scrollToNote,
  showPopoverForNote,
}) => {
  const navigate = useNavigate()
  const setSearchParams = useSearchParams()[1]
  const base = useBase()
  const isRemote = isLinkRemote(href)
  const targetNoteId = decodeURIComponent(
    href.slice(base.length === 1 ? 1 : base.length + 1),
  )
  const isTargetOpen = noteIdsStack.includes(targetNoteId)

  const extractPathAndAddToStack = useCallback(
    (mouseEvent) => {
      if (isRemote) return
      mouseEvent.preventDefault()
      const isSmallScreen = window.innerWidth < 800
      if (isSmallScreen) {
        navigate(`/${encodeURIComponent(targetNoteId)}`)
        return
      }
      if (isTargetOpen) {
        scrollToNote(targetNoteId)
      } else {
        const from = noteIdsStack.indexOf(openNoteId)
        setSearchParams({
          stacked: [...noteIdsStack.slice(1, from + 1), targetNoteId],
        })
      }
    },
    [
      isRemote,
      isTargetOpen,
      navigate,
      targetNoteId,
      scrollToNote,
      noteIdsStack,
      openNoteId,
      setSearchParams,
    ],
  )

  const onPointerEnter = useCallback(
    (event) => {
      // console.log('on mouse Enter');
      if (isRemote || event.pointerType !== "mouse") return
      showPopoverForNote({
        noteId: targetNoteId,
        elementPosition: event.currentTarget.getBoundingClientRect(),
      })
    },
    [isRemote, showPopoverForNote, targetNoteId],
  )

  const onPointerLeave = useCallback(
    (event) => {
      // console.log('on mouse Leave');
      if (isRemote || event.pointerType !== "mouse") return
      showPopoverForNote({hidden: true, noteId: targetNoteId})
    },
    [isRemote, showPopoverForNote, targetNoteId],
  )

  return (
    <a
      onClick={extractPathAndAddToStack}
      href={href}
      rel="noreferrer"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      className={
        "NoteLink " +
        (isTargetOpen ? "open " : "") +
        (isRemote ? "remote-link " : "")
      }
      target="_blank"
    >
      {text}
    </a>
  )
}

export default NoteLink
