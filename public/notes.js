// Get references to HTML elements
const noteForm = document.getElementById('noteForm');
const noteText = document.getElementById('noteText');
const noteList = document.getElementById('noteList');

// Function to fetch and display existing notes
async function displayNotes() {
  const response = await fetch('/api/notes');
  const notes = await response.json();

  // Clear the note list
  noteList.innerHTML = '';

  // Display each note
  notes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.textContent = note.text;
    noteList.appendChild(noteItem);
  });
}

// Event listener for form submission
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newNote = {
    text: noteText.value,
  };

  // Send a POST request to add the new note
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  });

  if (response.ok) {
    // Clear the input field
    noteText.value = '';
    // Refresh the displayed notes
    displayNotes();
  } else {
    console.error('Failed to add note.');
  }
});

// Initial display of existing notes
displayNotes();
