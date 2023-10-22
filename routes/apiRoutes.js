const notes = [];

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        notes.push(newNote);
        res.json(newNote);
    });
};
