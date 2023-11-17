const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route to serve the notes.html file
app.get('/notes', (req, res) => {
    // Return the notes.html file
    res.sendFile(__dirname + '/public/notes.html');
  });
  

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Import and use the notesRoutes module
const notesRoutes = require('./routes/notesRoutes');
app.use('/', notesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
