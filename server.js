const express = require('express');
const fs = require('fs');
const path = require('path');
const notesRoutes = require('./routes/notesRoutes'); // Import your routes module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define API routes (You can also put these in a separate router file)
app.get('/api/notes', (req, res) => {
  // Read the db.json file and return all saved notes as JSON
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  // Receive a new note in the request body
  const newNote = req.body;

  // Read the existing notes from db.json
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const notes = JSON.parse(data);

    // Generate a unique ID based on the current timestamp
    newNote.id = Date.now().toString();

    // Add the new note to the array of notes
    notes.push(newNote);

    // Write the updated notes array back to db.json
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(newNote);
    });
  });
});
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    // Read the existing notes from db.json
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const notes = JSON.parse(data);
  
      // Find the index of the note with the given ID
      const noteIndex = notes.findIndex((note) => note.id === noteId);
  
      if (noteIndex === -1) {
        // Note not found
        res.status(404).json({ error: 'Note not found' });
        return;
      }
  
      // Remove the note from the array
      notes.splice(noteIndex, 1);
  
      // Write the updated notes array back to db.json
      fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: 'Note deleted successfully' });
      });
    });
  });
// Define routes for your HTML pages
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define routes using the notesRoutes module (if you have one)
app.use('/', notesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
