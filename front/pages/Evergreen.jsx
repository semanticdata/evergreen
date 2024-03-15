import { useEffect, useState } from "react";

import Db from "../db/Db";

import Header from "../components/Header";
import NoteColumnsScrollingContainer from "../components/NoteColumnsScrollingContainer";

import "./Evergreen.scss";

const Evergreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Db.loadIndex().then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading || (
        <main className="NotePageRoot">
          <Header />
          <NoteColumnsScrollingContainer />
        </main>
      )}
    </>
  );
};

export default Evergreen;
