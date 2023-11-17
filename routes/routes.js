const express = require('express');
const router = express.Router();
const notesRoutes = require('./routes/notesRoutes');

// Define HTML routes
router.get('/notes', (req, res) => {
  // Return the notes.html file
  res.sendFile(__dirname + '/public/notes.html');
});

router.get('*', (req, res) => {
  // Return the index.html file for all other routes
  res.sendFile(__dirname + '/public/index.html');
});

// Define API routes
router.use('/api/notes', notesRoutes);

module.exports = router;
