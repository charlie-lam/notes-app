/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView.js');
const NotesModel = require('./notesModel.js');
const NotesClient = require('./notesClient');

describe('Page view', () => {
   /* it('displays 0  notes', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const view = new NotesView(model);
      view.displayNotes();
  
      expect(document.querySelectorAll('.note').length).toBe(0);
    });

    it('displays 2 notes', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const view = new NotesView(model);
      model.addNote('Buy milk')
      model.addNote('Mow the grass')
      view.displayNotes();
  
      expect(document.querySelectorAll('.note').length).toEqual(2);
    });

    it('displays the inputed note', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const view = new NotesView(model);
      const inputElement = document.querySelector('#note-input')
      const buttonEl = document.querySelector('#add-note-button');
      inputElement.value = 'Testing'
      buttonEl.click();
      const result = document.querySelector('.note').textContent
      expect(result).toEqual('Testing');
      expect(document.querySelectorAll('.note').length).toEqual(1);
    });

    it('displays the right number of notes by clearing previous notes', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const view = new NotesView(model);

      const inputElement = document.querySelector('#note-input')
      const buttonEl = document.querySelector('#add-note-button');
      inputElement.value = 'Testing'
      buttonEl.click();
      view.displayNotes();
      const result = document.querySelector('.note').textContent
      expect(result).toEqual('Testing');
      expect(document.querySelectorAll('.note').length).toEqual(1);
    });
*/
    it('displays the right number of notes from the api', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const mockClient = {loadNotes: (callback) =>  {
        callback(['This note is coming from the server'])
      }}
      const view = new NotesView(model, mockClient);

      view.displayNotesFromApi()
      const result = document.querySelector('.note').textContent
      expect(result).toEqual('This note is coming from the server');
      expect(document.querySelectorAll('.note').length).toEqual(1);
    });

    it('displays the added note from the post requst', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      let notes = ['This note is coming from the server']
      const mockClient = {
        loadNotes: (callback) =>  {
        callback(notes)
        },
        createNote : (note) => {
          notes.push(note)
          return new Promise(notes)
        }
      }
    
      const view = new NotesView(model, mockClient);

      const inputElement = document.querySelector('#note-input')
      const buttonEl = document.querySelector('#add-note-button');
      inputElement.value = 'Hello there'
      buttonEl.click();

      const result = document.querySelectorAll('.note')
      expect(result[0].textContent).toEqual('This note is coming from the server');
      expect(result[1].textContent).toEqual('Hello there');
      expect(document.querySelectorAll('.note').length).toEqual(2);
    });

    it('displays the error message to the page when not connected', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      const client = new NotesClient()
      const view = new NotesView(model, client);

      view.displayError();

      const result = document.querySelectorAll('.note')
      expect(result[0].textContent).toEqual('Oops, something went wrong!');
      expect(document.querySelectorAll('.note').length).toEqual(1);
    });

});