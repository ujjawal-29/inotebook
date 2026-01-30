import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";



const NoteItem = (props) => {
  const { note } = props;
  const { deleteNote } = useContext(noteContext);

  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => setExpanded(!expanded);

  return (
    <div className="col-md-3">
      <div className={`note-card ${expanded ? "expanded" : ""}`}>

        {/* Icons fixed on top */}
        <div className="note-icons">
          <i
            className="far fa-trash-alt delete-icon"
            onClick={() => deleteNote(note._id)}
          ></i>

          <i
            className="far fa-edit mx-2"
            onClick={() => props.updateNote(note)}
          ></i>
        </div>

        <div className="card-body">
          {/* Title */}
          <h5 className="card-title">{note.title}</h5>

          {/* Description */}
          <div className="card-text-container">
            <p className="card-text">{note.description}</p>
          </div>

          {/* Read More / Less */}
          {note.description.length > 120 && (
            <span className="read-more" onClick={toggleReadMore}>
              {expanded ? "Read Less" : "Read More"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
