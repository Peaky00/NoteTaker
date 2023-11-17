const express = require('express');
const router = express.Router();

// Sample data (replace with your actual data storage)
let notes = [];

// Route to retrieve notes
router.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Route to add a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.json(newNote);
});

// Route to delete a note by ID (replace with your actual deletion logic)
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter((note) => note.id !== noteId);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
