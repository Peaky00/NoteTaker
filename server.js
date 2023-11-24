const express = require('express');
require('dotenv').config();
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve the HTML, CSS, and JavaScript files
app.use(express.static('public'));

// API endpoint to get notes from db.json
app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
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
// ...

// API endpoint to add a note to db.json
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const db = JSON.parse(data);
      db.notes.push(newNote);

      fs.writeFile('db.json', JSON.stringify(db), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

// ...


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
