const NotesModel = require('./notesModel.js')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);


view.displayNotesFromApi();

