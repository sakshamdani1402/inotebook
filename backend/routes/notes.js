const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: GET all the notes using: GET "/api/notes/fetchallnotes". login req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }

});

//ROUTE 2: add a new note using: post "/api/notes/addnote". login req
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter valid name').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if errors occured during validation, return bad req and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //if there are no errors then create a new note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //save the note
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 3: update an existing note using: PUT "/api/notes/update". login req
router.put('/update/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ note });
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 4: delete an existing note using: DELETE "/api/notes/update". login req
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //allow deletion only if user own the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});
module.exports = router;