const express = require('express');
const router = express.Router();

// Sample data (replace with your actual data storage, e.g., a database)
let notes = [];

// Route to retrieve notes
router.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Route to add a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Validate newNote here if needed

  notes.push(newNote);
  res.status(201).json(newNote); // Return 201 Created status
});

// Route to delete a note by ID (replace with your actual deletion logic)
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Perform validation and deletion logic here

  notes = notes.filter((note) => note.id !== noteId);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
