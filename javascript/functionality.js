// check if theres existing notes in localStorage 
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return []
    };
};

// Save Notes to the localStorage
const saveNotes = notes => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Remove Note From localStorage
const removeNote = id => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};

// Remove all the Notes from the localStorage and clear the notes list HTML
const removeNotes = () => {
    localStorage.clear('notes');
    document.querySelector('#notes').innerHTML = '';
}

// Generate DOM Structure For A Note
const generateNoteElement = (note) => {
    const noteElement = document.createElement('div');
    const noteText = document.createElement('a');
    const removeButton = document.createElement('button');

    removeButton.textContent = 'x';
    noteElement.appendChild(removeButton);
    removeButton.addEventListener('click', e => { // remove note based on its id then update the notes in localStorage, then reRender the notes
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters)
    });

    if(note.title.length > 0) {
        noteText.textContent = note.title;
    } else {
        noteText.textContent = 'Untitled Note!'
    }
    // set attributes to the note to redirect the user to the edit page of the specific note based on its #ID
    noteText.setAttribute('href', `https://ahmedsamir96m.github.io/NotesApp/editnotes.html#${note.id}`);
    noteText.classList.add('note');
    noteElement.appendChild(noteText);
    noteElement.classList.add('new-note-element');

    return noteElement;
}

// Render The Notes 
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    const notesContainer = document.querySelector('#notes');
    notesContainer.innerHTML = '';

    filteredNotes.forEach(note => {
        const noteElement = generateNoteElement(note);
        notesContainer.appendChild(noteElement);
    })
};
// Uniqe ID Generator 
const generateID = () => {
    const randomNum = Math.random(Math.ceil()) * 95959942252351;
    return randomNum.toFixed(0);
};

