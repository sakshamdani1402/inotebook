import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    return <div className='col-md-4 my-3'>
        <div className="card note-item-card">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="bi bi-trash-fill mx-4" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted","success")}}></i>
                    <i className="bi bi-pencil-square mx-1" onClick={()=>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>;
};

export default NoteItem;
