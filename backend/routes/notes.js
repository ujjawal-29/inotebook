

const express = require('express');
const router = express.Router(); 
var fetchuser = require('../middleware/fetchuser'); 
const User = require('../models/User');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE:1 Get all the notes: GET "/api/notes/createuser". No login required

router.get('/fetchallnotes',fetchuser,async (req, res) => {
    try{
    const notes = await Note.find({user:req.user.id});   // 👈 Notes -> Note

    res.json(notes);
    } catch(error){
        console.error(error.message);
      res.status(500).send("internal server error");
    }
});

//ROUTE:2 add a new notes using: POST "/api/notes/addnote". No login required
router.post('/addnote',fetchuser,[
     body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Password must be atleast 5 characters').isLength({ min: 5 })
],async (req, res) => {
try{

    const {title,description,tag}=req.body;
   // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({                  // 👈 note -> Note
        title,description,tag,user: req.user.id
    })
   const savedNote = await note.save()       // 👈 ok

    res.json(savedNote);                    // 👈 savedNot -> savedNote
    }catch(error){
        console.error(error.message);
      res.status(500).send("internal server error");
    
}
});

//ROUTE:3 Update an existing  notes: put "/api/notes/updatenote". No login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {
        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);     // 👈 YAHAN note define kiya

        if (!note) {
            return res.status(404).send("Not found");
        }

        // check user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
});
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
