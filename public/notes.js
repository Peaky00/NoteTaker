// Function to add a note to the server
function addNote() {
  const noteTitleInput = document.getElementById('note-title-input');
  const noteTextInput = document.getElementById('note-text-input');

  const noteTitle = noteTitleInput.value.trim();
  const noteText = noteTextInput.value.trim();

  if (noteTitle !== '' && noteText !== '') {
    const newNote = {
      title: noteTitle,
      text: noteText,
    };

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((addedNote) => {
        // Handle the response from the server
        console.log('Added note:', addedNote);

        // Clear the input fields
        noteTitleInput.value = '';
        noteTextInput.value = '';

        // Update the button
        updateButton();

        // Fetch and display the updated notes list
        fetchNotes();
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
  }
}

// Function to fetch and display saved notes
function fetchNotes() {
  fetch('/api/notes')
    .then((response) => response.json())
    .then((notes) => {
      // Handle the response from the server
      console.log('Fetched notes:', notes);

      // Display the saved notes in the notes list
      const notesList = document.getElementById('notes-list');
      notesList.innerHTML = '';

      for (const note of notes) {
        if (note) { // Check if the note object is not null
          const li = document.createElement('li');
          const title = note.title || 'No Title'; // Default to 'No Title' if title is missing
          const text = note.text || 'No Text';     // Default to 'No Text' if text is missing
          li.innerHTML = `<strong>${title}</strong><br>${text}`;

          // Add a click event listener to each note item
          li.addEventListener('click', () => {
            displaySelectedNote(note);
          });

          notesList.appendChild(li);
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching notes:', error);
    });
}

// Function to display a selected note (title and text)
function displaySelectedNote(selectedNote) {
  const selectedNoteTitleContainer = document.getElementById('selected-note-title');
  const selectedNoteTextContainer = document.getElementById('selected-note-text');

  selectedNoteTitleContainer.innerHTML = `<strong>Note Title:</strong> ${selectedNote.title}`;
  selectedNoteTextContainer.innerHTML = `<strong>Note Text:</strong> ${selectedNote.text}`;
}

// Function to update the button text and behavior
function updateButton() {
  const noteTitleInput = document.getElementById('note-title-input');
  const noteTextInput = document.getElementById('note-text-input');
  const addNoteButton = document.getElementById('add-note-button');

  if (noteTitleInput.value.trim() !== '' && noteTextInput.value.trim() !== '') {
    addNoteButton.textContent = 'Clear Form';
    addNoteButton.onclick = clearForm;
  } else {
    addNoteButton.textContent = 'New Note';
    addNoteButton.onclick = addNote;
  }
}

// Function to clear the form
function clearForm() {
  const noteTitleInput = document.getElementById('note-title-input');
  const noteTextInput = document.getElementById('note-text-input');

  noteTitleInput.value = '';
  noteTextInput.value = '';

  // Update the button text and behavior after clearing the form
  updateButton();
}

// Attach event listener to the "New Note" button
document.getElementById('add-note-button').addEventListener('click', addNote);
document.getElementById('clear-form-button').addEventListener('click', clearForm);

// Call the fetchNotes function to display saved notes when the page loads
fetchNotes();
