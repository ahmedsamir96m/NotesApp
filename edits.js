const hashID = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === hashID);

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeNoteBtn = document.querySelector('#remove-note');


if (note === undefined) {
    location.assign('/index.html');
};

noteTitle.value = note.title;
noteBody.value = note.body;

noteTitle.addEventListener('input', e => {
    note.title = e.target.value;
    saveNotes(notes);
});

noteBody.addEventListener('input', e => {
    note.body = e.target.value;
    saveNotes(notes);
});

removeNoteBtn.addEventListener('click', e => {
    e.preventDefault();
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/index.html')
});

// Sync the notes all over the app by getting the latest Data in localStorage
window.addEventListener('storage', e => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find(note => note.id === hashID);

        if (note === undefined) {
            location.assign('/index.html');
        };

        noteTitle.value = note.title;
        noteBody.value = note.body;
    }
})


 