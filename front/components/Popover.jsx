/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Db from "../db/Db";

import ReactMarkdown from "react-markdown";

import { noteToMarkdownContent, useBase } from "../utils";

import "./Popover.scss";

const Popover = ({ elementPosition, noteId }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [note, setNote] = useState(null);

  const base = useBase();

  useEffect(() => {
    let newPosition = {
      x: 0,
      y: elementPosition.top + elementPosition.height / 2,
    };
    const availableSpaceRightOfTheElement =
      window.innerWidth - elementPosition.right;
    if (availableSpaceRightOfTheElement > 500)
      newPosition.x = elementPosition.right;
    else newPosition.x = elementPosition.left - 500;
    setPosition(newPosition);
  }, [
    elementPosition.height,
    elementPosition.left,
    elementPosition.right,
    elementPosition.top,
  ]);

  useEffect(() => {
    Db.getNote(noteId).then((n) => setNote(n));
  }, [noteId]);

  return (
    <div
      className="Popover PopoverTransition-appear PopoverTransition-appear-active"
      style={{
        position: "absolute",
        opacity: position.x === 0 ? 0 : 1,
        willChange: "transform",
        top: "0px",
        left: "0px",
        transform: `translate3d(${position.x}px,
        ${position.y}px, 0px)`,
      }}
    >
      <div className="HoveredNote">
        <div className="HoveredNoteInterior">
          <div>
            <ReactMarkdown>
              {note ? noteToMarkdownContent(base, note) : ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
