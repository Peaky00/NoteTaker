const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Read existing notes from db.json
const readNotes = () => {
  const dbFilePath = path.join(__dirname, 'db.json');
  let notes = [];
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    notes = JSON.parse(data);
    if (!Array.isArray(notes)) {
      // If the data is not an array, initialize notes as an empty array
      notes = [];
    }
  } catch (error) {
    // Handle the case where db.json is empty or does not exist
  }
  return notes;
};

// Write notes to db.json
const writeNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes), 'utf8');
};

// HTML route for the root path ("/") to serve notes.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// HTML route for all other routes (including /notes, which you can leave as is)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = readNotes();
  newNote.id = Date.now().toString(); // Add a unique ID to the note
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
