const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API route to get all notes
  app.get('/api/notes', (req, res) => {
    // Read the db.json file and return saved notes
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    res.json(notes);
  });

  // API route to save a new note
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
    res.json(newNote);
  });
};
