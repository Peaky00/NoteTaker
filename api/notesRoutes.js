const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

// Sample data (replace with your actual data storage, e.g., a database)
let notes = [];

// Route to retrieve notes
router.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Route to add a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Generate a unique ID for the new note using uuid
  newNote.id = uuidv4();

  // Validate newNote here if needed

  notes.push(newNote);
  res.status(201).json(newNote); // Return 201 Created status
});

// Route to delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the given ID in the `notes` array
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    // If the note with the given ID is not found, return a 404 Not Found response
    res.status(404).json({ error: 'Note not found' });
  } else {
    // Remove the note from the `notes` array
    const deletedNote = notes.splice(noteIndex, 1)[0];
    res.json({ message: 'Note deleted', deletedNote });
  }
});

module.exports = router;
