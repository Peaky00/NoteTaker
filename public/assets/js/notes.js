// script.js

// Function to fetch and display notes
const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const notes = await response.json();
  
      const noteList = document.getElementById('note-list');
      noteList.innerHTML = ''; // Clear existing notes
  
      // Iterate through notes and create list items
      notes.forEach((note) => {
        const listItem = document.createElement('li');
        const titleElement = document.createElement('h3');
        const textElement = document.createElement('p');
  
        titleElement.textContent = note.title;
        textElement.textContent = note.text;
  
        listItem.appendChild(titleElement);
        listItem.appendChild(textElement);
  
        noteList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  // Call fetchNotes to load and display notes when the page loads
  fetchNotes();
  
  const noteForm = document.getElementById('note-form');
  const noteTitle = document.getElementById('note-title');
  const noteText = document.getElementById('note-text');
  const clearFormButton = document.getElementById('clear-form');
  
  // Event listener for form submission
  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
  
    if (!title || !text) {
      alert('Please enter both a title and a note.');
      return;
    }
  
    const newNote = { title, text };
  
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        noteTitle.value = '';
        noteText.value = '';
        fetchNotes(); // Fetch and display updated notes
      } else {
        alert('Error saving the note. Please try again.');
      }
    } catch (error) {
      console.error('Error saving the note:', error);
    }
  });
  
  // Event listener for Clear Form button
  clearFormButton.addEventListener('click', () => {
    noteTitle.value = '';
    noteText.value = '';
  });
  