let notes = getSavedNotes();

const filters = {
    searchText: ''
}

renderNotes(notes, filters);

// Create Note Object & push it into the notes array then store the notes array in localStorage then render the notes
document.querySelector('#create-note').addEventListener('click', e => {
    const id = generateID();
    notes.push({
        id: id, 
        title: '',
        body: ''
    });
    saveNotes(notes);
    // redirect the user to the edit page to create the note that specified to its own ID
    location.assign(`/editnotes.html#${id}`);
});
// change the searchText value to the input value so the displayed notes get filtered & rendered based on the user input
document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
    console.log(e.target.value);
});
// live update the note on the home page to what is being edit in the edit page
window.addEventListener('storage', e => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters)
    }
});

document.querySelector('#removeAll').addEventListener('click', removeNotes)





















