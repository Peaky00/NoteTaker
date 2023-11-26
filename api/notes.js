const express = require('express');
const router = express.Router();
const notesRoutes = require('./routes/notesRoutes');

// Define HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

router.get('*', (req, res) => {
  // Return the index.html file for all other routes
  res.sendFile(__dirname + '/public/index.html'); // Corrected path
});

// Define API routes
router.use('/api/notes', notesRoutes);

module.exports = router;
