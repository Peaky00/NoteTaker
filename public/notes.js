// Get references to HTML elements
const noteForm = document.getElementById('noteForm');
const noteText = document.getElementById('noteText');
const noteList = document.getElementById('noteList');

// Function to fetch and display existing notes
// Function to fetch and display existing notes
async function displayNotes() {
    const response = await fetch('/api/notes');
    const notes = await response.json();
  
    // Clear the note list
    noteList.innerHTML = '';
  
    // Display each note with a trash can icon
    notes.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
          <div>${note.text}</div>
          <button class="delete-note" data-note-id="${note.id}">
            <i class="fas fa-trash"></i> <!-- FontAwesome trash can icon -->
          </button>
        `;
      
        // Add a click event listener to the trash can icon button
        const deleteButton = noteItem.querySelector('.delete-note');
        deleteButton.addEventListener('click', deleteNote);
      
        noteList.appendChild(noteItem);
      });
      
  }
  
  // Function to handle deleting a note
  async function deleteNote(e) {
    const noteId = e.target.dataset.noteId;
    console.log('Note ID to delete:', noteId); 
  
    // Send a DELETE request to delete the note by ID
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      // Refresh the displayed notes after deleting
      displayNotes();
    } else {
      console.error('Failed to delete note.');
    }
  }
  
  // ... Other code for form submission, clearing form, and initial display
  
  // Initial display of existing notes
  displayNotes();
  

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
