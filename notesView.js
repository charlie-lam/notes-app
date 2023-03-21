class NotesView {
    constructor(model,client){
        this.model = model;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');

        

        document.querySelector('#add-note-button').addEventListener('click', () => {
            let note = document.querySelector('#note-input').value;
            this.addNewNote(note)
            document.querySelector('#note-input').value = '';
            }
        );


        document.querySelector('#delete').addEventListener('click', () => {
            this.deleteNotes()
        });
    };

    addNewNote(note){
            this.client.createNote(note)
            .then((data) => {
                console.log(`Success adding note, these are all your notes: ${data}`)
                this.displayNotesFromApi()
            })
    }

    deleteNotes(){
        this.client.reset()
            .then(data => {
                console.log(data)
                this.displayNotesFromApi();
            })
    }

    displayNotes(){
        let previous = document.querySelectorAll('div.note')
        previous.forEach(oldNoteDiv => {
            oldNoteDiv.remove()
        });

        const notes = this.model.getNotes()
        notes.forEach(element => {
            let noteDiv = document.createElement("div")
            noteDiv.className = 'note'
            noteDiv.textContent = element;
            this.mainContainerEl.append(noteDiv);
        });
    };

    displayNotesFromApi(){
        this.client.loadNotes((data) => {
            this.model.setNotes(data)
            this.displayNotes();
        });
    };
};

module.exports = NotesView;