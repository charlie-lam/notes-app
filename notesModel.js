class NotesModel {
    constructor(){
        this.notes = [];
    }
    getNotes(){
        return this.notes
    };
    addNote(note){
        this.notes.push(note)
    };
    setNotes(apiData){
        this.notes = apiData
    }
    reset(){
        this.notes = []
    };
};

module.exports = NotesModel;