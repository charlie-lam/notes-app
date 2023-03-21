class NotesClient {
    constructor(){

    };
    async loadNotes(callback){
        const response = await fetch('http://localhost:3000/notes')
        const data = await response.json();
        callback(data);
    };

    createNote(content){
        return fetch('http://localhost:3000/notes', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'note': content})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error(error))
    }

    reset(){
        return fetch('http://localhost:3000/notes', {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Sucess data now ' + data)
                return data
            });
    }
};

module.exports = NotesClient;