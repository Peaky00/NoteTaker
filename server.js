const express = require('express');
require('dotenv').config();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

// Serve the HTML, CSS, and JavaScript files
app.use(express.static('public'));

// Construct the file path to db.json
const filePath = path.join(__dirname, 'db', 'db.json');

// API endpoint to get notes from db.json
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API endpoint to get notes from db.json
app.get('/api/notes', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const db = JSON.parse(data);
      res.json(db.notes);
    }
  });
});

// API endpoint to add a note to db.json
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return; // Exit the function early in case of an error
    }

    let db = { notes: [] }; // Initialize with an empty array by default

    try {
      // Attempt to parse the existing data
      db = JSON.parse(data);
      if (!db.notes) {
        db.notes = []; // Initialize with an empty array if 'notes' property is missing
      }
    } catch (parseError) {
      console.error(parseError);
    }

    db.notes.push(newNote);

    fs.writeFile(filePath, JSON.stringify(db), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(newNote);
      }
    });
  });
});

// ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
