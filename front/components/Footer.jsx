/* eslint-disable react/prop-types */
import { useBase } from "../utils";
import "./Footer.scss";

import NoteLink from "./NoteLink";

const Footer = ({ note, showPopoverForNote, noteIdsStack, scrollToNote }) => {
  const base = useBase();

  const elem = (
    <div className="Footer">
      <h3 className="BacklinksHeading">Links to this note</h3>
      <div className="BacklinksContainer">
        {note?.referenced_by?.map((backlinkNote) => (
          <NoteLink
            key={backlinkNote}
            href={`${base}/${encodeURIComponent(backlinkNote)}`}
            openNoteId={note.id}
            noteIdsStack={noteIdsStack}
            scrollToNote={scrollToNote}
            showPopoverForNote={showPopoverForNote}
            text={backlinkNote}
          />
        ))}
      </div>
    </div>
  );

  return note?.referenced_by?.length > 0 ? elem : <></>;
};

export default Footer;
