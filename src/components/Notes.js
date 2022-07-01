import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';



export const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ if: "", edittitle: "", editdescription: "", edittag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        //if we have auth token then show notes else redirect to login page
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
    }, []);
    const updateNote = (currNote) => {
        ref.current.click();
        setNote({ id: currNote._id, edittitle: currNote.title, editdescription: currNote.description, edittag: currNote.tag });
    }
    const handleClick = (e) => {
        console.log("updating note..", note);
        editNote(note.id, note.edittitle, note.editdescription, note.edittag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" name='edittitle' aria-describedby="emailHelp" onChange={onChange} value={note.edittitle}
                                        minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editdescription" name='editdescription' onChange={onChange} value={note.editdescription}
                                        minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edittag" name='edittag' onChange={onChange} value={note.edittag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edittitle.length < 3 || note.editdescription.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <h3 className='mt-5'>Your Notes</h3>
                <div className="container mx-3 my-3">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                    })
                }
            </div>
        </>)
};

export default Notes;