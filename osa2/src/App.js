import React from 'react';
import Note from './components/Note';
import Person from './components/Person';
import Notification from './components/Notification'
// import axios from 'axios'
import noteService from './services/notes'
import personService from './services/persons'

/*
const persons = [
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Martti Tienari', number: '040-123456'},
    {name: 'Arto Järvinen', number: '040-123456'},
    {name: 'Lea Kutvonen', number: '040-123456'}
];
*/

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            newNote: '',
            showAll: true,
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            error: null,
            success: null
        }
    }

    componentDidMount() {
        noteService.getAll()
            .then(data => this.setState({notes: data}));
        personService.getAll()
            .then(response => this.setState({persons: response}));
    }


    toggleVisible = () => {
        this.setState({showAll: !this.state.showAll});
    }

    toggleImportanceOf = (id) => {
        return () => {
            // const url = `http://localhost:3001/notes/${id}`
            const note = this.state.notes.find(n => n.id === id)
            const changedNote = {...note, important: !note.important}

            noteService
                .update(id, changedNote)
                .then(changedNote => {
                    const notes = this.state.notes.filter(n => n.id !== id)
                    this.setState({
                        notes: notes.concat(changedNote),
                        success: `Muistiinpano '${changedNote.content}' päivitetty`
                    })
                    this.hideSuccess();
                })
                .catch(error => {
                    this.setState({
                        error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
                        notes: this.state.notes.filter(n => n.id !== id)
                    })
                    this.hideError();
                })
        }
    }

    hideError() {
        setTimeout(() => {
            this.setState({error: null})
        }, 5000)
    }

    hideSuccess() {
        setTimeout(() => {
            this.setState({success: null})
        }, 5000)
    }

    addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: this.state.newNote,
            date: new Date(),
            important: Math.random() > 0.5
        };

        noteService.create(noteObject)
            .then(note => {
                const notes = this.state.notes.concat(note);
                this.setState({
                    notes: notes,
                    success: `Muistiinpano ${note.content} lisätty`,
                    newNote: ''
                });
                this.hideSuccess();
            })
    };

    addPerson = (event) => {
        event.preventDefault();

        const name = this.state.newName;
        const number = this.state.newNumber;
        if (name == null || name === '') {
            return;
        }
        const oldPerson = this.state.persons.find(p => p.name === name)
        if (oldPerson !== undefined) {
            if (window.confirm('Henkilö on jo olemassa. Haluatko korvata henkilön puhelinnumeron uudella?')) {
                const newPerson = {...oldPerson, number: number}
                personService.update(newPerson.id, newPerson)
                    .then(p => {
                        this.setState(
                            {
                                persons: this.state.persons.map(p2 => p2.id !== p.id ? p2 : p),
                                success: `Henkilö '${p.name}' päivitetty`
                            })
                        this.hideSuccess();
                    })
            }
            return;
        }
        const person = {name, number};
        personService.create(person)
            .then(created => {
                this.setState({
                    persons: this.state.persons.concat(created),
                    success: `Henkilö '${created.name}' lisätty`,
                    newName: '',
                    newNumber: ''
                })
                this.hideSuccess();
            })
    };

    createDeleteHandler = (person) => {
        return () => {
            if (window.confirm('Haluatko varmasti poistaa henkilön?')) {
                personService.remove(person.id)
                    .then(p => {
                        this.setState({
                            persons: this.state.persons.filter(p => p !== person),
                            success: `Henkilö ${person.name} poistettu`
                        })
                        this.hideSuccess();
                    })
            }
        }
    }

    handleNoteChange = (event) => {
        console.log(event.target.value);
        this.setState({newNote: event.target.value});
    }

    handleNameChange = (event) => {
        console.log(event.target.value);
        this.setState({newName: event.target.value});
    }

    handleNumberChange = (event) => {
        console.log(event.target.value);
        this.setState({newNumber: event.target.value});
    }

    handleFilterChange = (event) => {
        console.log(event.target.value);
        this.setState({filter: event.target.value});
    }

    filterPersons = () => {
        if (this.state.filter === null || this.state.filter === '')
            return this.state.persons;
        else {
            return this.state.persons.filter(p => p.name.toLowerCase().startsWith(this.state.filter.toLowerCase()));
        }
    }

    render() {
        const notesToShow =
            this.state.showAll ?
                this.state.notes :
                this.state.notes.filter(note => note.important === true);

        const label = this.state.showAll ? 'vain tärkeät' : 'kaikki';

        return (
            <div>
                <div>
                    <h1>Muistiinpanot</h1>
                    <Notification className="error" message={this.state.error}/>
                    <Notification className="success" message={this.state.success}/>
                    <div>
                        <button onClick={this.toggleVisible}>
                            Näytä {label}
                        </button>
                    </div>
                    <ul>
                        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOf(note.id)}/>)}
                    </ul>
                    <form onSubmit={this.addNote}>
                        <input
                            placeholder='Syötä muistiinpano'
                            onChange={this.handleNoteChange}
                        />
                        <button type="submit">tallenna</button>
                    </form>
                </div>
                <div>
                    <h2>Puhelinluettelo</h2>
                    <form onSubmit={this.addPerson}>
                        <div>
                            Nimi: <input placeholder='Syötä nimi' value={this.state.newName} onChange={this.handleNameChange}/>
                        </div>
                        <div>
                            Numero: <input placeholder='Syötä puhelinnumero' value={this.state.newNumber} onChange={this.handleNumberChange}/>
                        </div>
                        <div>{this.state.newName}</div>
                        <div>{this.state.newNumber}</div>
                        <div>
                            <button type="submit">Lisää</button>
                        </div>
                    </form>
                    <h2>Numerot</h2>
                    <div>Rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}/></div>
                    {this.filterPersons().map(p => <Person key={p.name} person={p} deleteHandler={this.createDeleteHandler(p)}/>)}
                </div>
            </div>
        )
    }
}

export default App;
