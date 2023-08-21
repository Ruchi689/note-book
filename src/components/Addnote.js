import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"

const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
    }

    const onChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form className='my-3'>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control my-3" id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control my-3" id="description" name="description" value={note.description} aria-describedby="emailHelp" placeholder="Enter Description" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="tag" className="form-control" id="tag" name='tag' value={note.tag} placeholder="Enter the tag" onChange={onChange}
                        />
                    </div>
                    <button disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
