// import React, { useContext, useEffect, useRef, useState } from 'react'
// import noteContext from "../context/notes/noteContext"
// import Noteitem from './Noteitem';
// import AddNote from './AddNote';
// import { useNavigate } from "react-router-dom";

// const Notes = (props) => {
//     const context = useContext(noteContext);
//    const navigate = useNavigate();

//     const { notes, getNotes, editNote } = context;

//     useEffect(() => {
//         if(localStorage.getItem('token')){
//              getNotes();

//         }
//         else{
//            navigate("/login");

//         }
       
//         // eslint-disable-next-line
//     }, []);

//     const ref = useRef(null);       // modal open
//     const refClose = useRef(null);  // modal close

//     const [note, setNote] = useState({
//         id: "",
//         title: "",
//         description: "",
//         tag: "default"
//     });

//     // जब Edit button दबेगा
//     const updateNote = (currentNote) => {
//         ref.current.click(); // open modal

//         setNote({
//             id: currentNote._id,
//             title: currentNote.title,
//             description: currentNote.description,
//             tag: currentNote.tag
//         });
       
//     };

//     // जब Update Note दबेगा
//     const handleClick = (e) => {
//         e.preventDefault();

//         // Context function call
//         editNote(note.id, note.title, note.description, note.tag);

//         // Close modal
//         refClose.current.click();
//         props.showAlert("Updated Successfully","success");
//     };

//     const onChange = (e) => {
//         setNote({ ...note, [e.target.name]: e.target.value });
//     };

//     return (
//         <>
//             <AddNote showAlert={props.showAlert} />

//             {/* Hidden button to open modal */}
//             <button
//                 ref={ref}
//                 type="button"
//                 className="btn btn-primary d-none"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//             >
//                 Launch modal
//             </button>

//             {/* Modal */}
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">

//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>

//                         <div className="modal-body">
//                             <form className="my-3">

//                                 <div className="mb-3">
//                                     <label className="form-label">Title</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="title"
//                                         value={note.title}
//                                         onChange={onChange} minLength={5} required
//                                     />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Description</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="description"
//                                         value={note.description}
//                                         onChange={onChange}minLength={5} required
//                                     />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Tag</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="tag"
//                                         value={note.tag}
//                                         onChange={onChange}
//                                     />
//                                 </div>

//                             </form>
//                         </div>

//                         <div className="modal-footer">
//                             <button
//                                 ref={refClose}
//                                 type="button"
//                                 className="btn btn-secondary"
//                                 data-bs-dismiss="modal"
//                             >
//                                 Close
//                             </button>

//                             <button
//                                 type="button"
//                                 className="btn btn-primary"
//                                 onClick={handleClick}
//                             >
//                                 Update Note
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* Notes List */}
//             <div className="row my-3">
//                 <h2>Your Notes</h2>
//                 <div className="container">
//                 {notes.length===0 &&' no notes to display'}
//                 </div>

//                 {notes.map((note) => {
//                     return (
//                         <Noteitem
//                             key={note._id}
//                             note={note}
//                             updateNote={updateNote}
//                             showAlert={props.showAlert}
//                         />
//                     );
//                 })}
//             </div>
//         </>
//     )
// }

// export default Notes;

import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, editNote } = context;

  const refOpen = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });

  const updateNote = (currentNote) => {
    refOpen.current.click(); // modal open
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); // modal close
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hidden button to open modal */}
      <button
        ref={refOpen}
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Open
      </button>

      {/* MODAL */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="editNoteModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
              />
              <textarea
                className="form-control mb-2"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
              />
              <input
                type="text"
                className="form-control"
                name="etag"
                value={note.etag}
                onChange={onChange}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
