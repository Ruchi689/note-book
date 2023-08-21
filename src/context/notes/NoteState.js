import React, { useState }  from "react";
import noteContext from "./NoteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []

    const [notes,setNotes] = useState(notesInitial);


    // Get all note
    const getnotes = async ()=>{
      // TODO: API call
      const url = `${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
       method: 'GET',
       headers: {
         "Content-Type": "application/json",
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMmRjMDY2ODkzNDRmOTgxNTMyMTM1In0sImlhdCI6MTY4MTA1NDcyNn0.peaRqLXyWLga16XOrq8bpu4diuE983Xq-ug3Arbs6U8"
        // "auth-token": localStorage.getItem('token')
       },
     });
     const json = await response.json();
     console.log(json)
     setNotes(json);
   }


    // Add a note
    const addNote = async (title, description, tag)=>{
       // TODO: API call
      //  const url = `${host}/api/notes/addnote`
       const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMmRjMDY2ODkzNDRmOTgxNTMyMTM1In0sImlhdCI6MTY4MTA1NDcyNn0.peaRqLXyWLga16XOrq8bpu4diuE983Xq-ug3Arbs6U8"
          // "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();

      // Logic to add a note
      // console.log("Adding a new note....")
      // const note =  {
      //   "_id": "641432ba55e69e89b5449080",
      //   "user": "64133185de43901acd22527e",
      //   "title": title,
      //   "description": description,
      //   "tags": tag,
      //   "date": "2023-03-17T09:28:26.960Z",
      //   "__v": 0
      // };
      setNotes(notes.concat([note]));
    }


    // Delete a note
    const deleteNote = async(id)=>{
      // API call
       const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMmRjMDY2ODkzNDRmOTgxNTMyMTM1In0sImlhdCI6MTY4MTA1NDcyNn0.peaRqLXyWLga16XOrq8bpu4diuE983Xq-ug3Arbs6U8"
          // "auth-token": localStorage.getItem('token')
        },
      });
      // const json = response.json();
      // console.log(json)

      // Logic to delete a note
      console.log("Deleting the note with id "+ id);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }

    // Edit a note
    const editNote = async(id, title, description, tag)=>{
      // TODO: API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMmRjMDY2ODkzNDRmOTgxNTMyMTM1In0sImlhdCI6MTY4MTA1NDcyNn0.peaRqLXyWLga16XOrq8bpu4diuE983Xq-ug3Arbs6U8"
          // "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      // const json = await response.json();

      let newNotes = JSON.parse(JSON.stringify(notes));

      // Logic to edit the note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes, addNote, getnotes, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;