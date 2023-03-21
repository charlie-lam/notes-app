const NotesModel = require('./notesModel.js')

describe('NotesModel', () => {
    test('returns an empty array', () => {
        const model = new NotesModel()
        expect(model.getNotes()).toEqual([])
    });

    test("should now return ['Buy milk', 'Go to the gym']", () => {
        const model = new NotesModel()
        model.addNote('Buy milk')
        model.addNote('Go to the gym')
        expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym'])
    });

    test("should now return []", () => {
        const model = new NotesModel()
        model.addNote('Buy milk')
        model.addNote('Go to the gym')
        model.reset()
        expect(model.getNotes()).toEqual([])
    });
});

