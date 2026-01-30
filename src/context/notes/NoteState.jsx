// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) => {
//   const host = "http://localhost:5000";

//   const [notes, setNotes] = useState([]);

//   // 🔹 Get all notes (Protected)
//   const getNotes = async () => {

//     // Agar token hi nahi hai, to notes clear aur return
//     if (!localStorage.getItem("token")) {
//       setNotes([]);
//       return;
//     }

//     try {
//       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem('token')
//         },
//       });

//       // Agar unauthorized / error
//       if (!response.ok) {
//         console.error("Fetch notes failed:", response.status);
//         setNotes([]);   // purane notes clear
//         return;
//       }

//       const json = await response.json();
//       console.log("Fetched notes:", json);
//       setNotes(json);

//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       setNotes([]);
//     }
//   };

//   // 🔹 Add a note
//   const addNote = async (title, description, tag) => {

//     if (!localStorage.getItem("token")) return;

//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem('token'),
//       },
//       body: JSON.stringify({
//         title: title,
//         description: description,
//         tag: tag,
//       }),
//     });

//     const json = await response.json();
//     console.log("Add note response:", json);

//     if (response.ok) {
//       setNotes(notes.concat(json));
//     } else {
//       console.error("Add note error:", json);
//     }
//   };

//   // 🔹 Delete a note
//   const deleteNote = async (id) => {

//     if (!localStorage.getItem("token")) return;

//     await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem('token')
//       },
//     });

//     const newNotes = notes.filter((note) => note._id !== id);
//     setNotes(newNotes);
//   };

//   // 🔹 Edit a note
//   const editNote = async (id, title, description, tag) => {

//     if (!localStorage.getItem("token")) return;

//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem('token')
//       },
//       body: JSON.stringify({
//         title: title,
//         description: description,
//         tag: tag,
//       }),
//     });

//     const json = await response.json();
//     console.log("Edit note response:", json);

//     if (!response.ok) {
//       console.error("Edit note error:", json);
//       return;
//     }

//     let newNotes = JSON.parse(JSON.stringify(notes));
//     for (let index = 0; index < newNotes.length; index++) {
//       if (newNotes[index]._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes);
//   };

//   return (
//     <NoteContext.Provider
//       value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
//     >
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;












// import React, { useState } from "react";
// import noteContext from "./noteContext";

// const NoteState = (props) => {
//   const host = "https://inotebook-backend-8c05.onrender.com"; // Backend live URL

//   const notesInitial = [];
//   const [notes, setNotes] = useState(notesInitial);

//   // Fetch all notes
//   const getNotes = async () => {
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token")
//       }
//     });
//     const json = await response.json();
//     setNotes(json);
//   };

//   // Add a note
//   const addNote = async (title, description, tag) => {
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token")
//       },
//       body: JSON.stringify({ title, description, tag })
//     });
//     const note = await response.json();
//     setNotes(notes.concat(note));
//   };

//   // Delete a note
//   const deleteNote = async (id) => {
//     await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token")
//       }
//     });
//     setNotes(notes.filter((note) => note._id !== id));
//   };

//   // Edit a note
//   const editNote = async (id, title, description, tag) => {
//     await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token")
//       },
//       body: JSON.stringify({ title, description, tag })
//     });

//     // Client side update
//     const newNotes = JSON.parse(JSON.stringify(notes));
//     for (let i = 0; i < newNotes.length; i++) {
//       if (newNotes[i]._id === id) {
//         newNotes[i].title = title;
//         newNotes[i].description = description;
//         newNotes[i].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes);
//   };

//   return (
//     <noteContext.Provider
//       value={{ notes, addNote, deleteNote, editNote, getNotes }}
//     >
//       {props.children}
//     </noteContext.Provider>
//   );
// };

// export default NoteState;



import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // 🔹 Backend URL from .env
  const host = process.env.REACT_APP_BACKEND_URL;

  const [notes, setNotes] = useState([]);

  // 🔹 Get all notes (Protected)
  const getNotes = async () => {
    if (!localStorage.getItem("token")) {
      setNotes([]);
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
      });

      if (!response.ok) {
        console.error("Fetch notes failed:", response.status);
        setNotes([]);
        return;
      }

      const json = await response.json();
      console.log("Fetched notes:", json);
      setNotes(json);

    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  // 🔹 Add a note
  const addNote = async (title, description, tag) => {
    if (!localStorage.getItem("token")) return;

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("Add note response:", json);

      if (response.ok) {
        setNotes(notes.concat(json));
      } else {
        console.error("Add note error:", json);
      }
    } catch (error) {
      console.error("Add note fetch error:", error);
    }
  };

  // 🔹 Delete a note
  const deleteNote = async (id) => {
    if (!localStorage.getItem("token")) return;

    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete note error:", error);
    }
  };

  // 🔹 Edit a note
  const editNote = async (id, title, description, tag) => {
    if (!localStorage.getItem("token")) return;

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("Edit note response:", json);

      if (!response.ok) {
        console.error("Edit note error:", json);
        return;
      }

      const newNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(newNotes);

    } catch (error) {
      console.error("Edit note fetch error:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
