import React, { useContext, useState, useEffect, useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from "../context/notes/NoteContext"
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getnotes, editNote } = context;
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes();
        }
        else{
            navigate("/login");
        }
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    
    const updatenote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    const handleClick = (e) => {
        console.log("Updating the note...",note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }
    const onChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control my-3" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control my-3" id="edescription" name="edescription"  value={note.edescription} aria-describedby="emailHelp" placeholder="Enter Description" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="tag" className="form-control" id="etag" name="etag"  value={note.etag} placeholder="Enter the tag" onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length===0 && 'No notes to display'}
                </div>
                {notes && notes.length && notes.map((notes) => {
                    return <Noteitem key={notes._id} updatenote={updatenote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes
