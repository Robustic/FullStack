import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (props) => {
    return (
        <p>
            <span>{props.name} {props.number}&nbsp;</span>
            <button onClick={() => props.handleDelete(props.id, props.name, props.setPersons)}>
                Delete contact
            </button>
        </p>
    )
}

const Filter = (props) => {
    return (
        <div>
            filter shawn with:
            <input
                value={props.filter}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                name:
                    <input
                    value={props.newName}
                    onChange={props.handleNameChange}
                />
            </div>
            <div>
                number:
                    <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button
                    type="submit">add
                    </button>
            </div>
        </form>
    )
}

const Persons = (props) => {
    const filteredPersons = props.persons.filter(person =>
        (person.name.toLowerCase().includes(props.filter.toLowerCase()))
    )    

    const rows = () => filteredPersons.map(person =>
        <Person
            key={person.name}
            name={person.name}
            number={person.number}
            handleDelete={props.handleDelete}
            setPersons={props.setPersons}
            id={person.id}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const nameExists = persons.filter(person => (person.name === newName))
        if (nameExists.length > 0) {
            window.alert(`${newName} is already added to phonebook`);
        } else if (newName.length === 0) {
            window.alert(`name is empty`);
        } else if (newNumber.length === 0) {
            window.alert(`number is empty`);
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleDelete = (id, name, setPersons) => {
        console.log('Yritit tehdä deleten kohteelle ' + id)
        if (window.confirm(`Delete contact ${name} ?`)) {
            personService
                .deleteOne(id)
            setPersons(persons.filter(person => person.id !== id))
            // personService
            //     .getAll()
            //     .then(allPersons => {
            //         console.log('Määrä on taalla')
            //         setPersons(allPersons)
            //     })            
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <h3>Add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter}
                handleDelete={handleDelete}
                setPersons={setPersons}
            />
        </div>
    )
}

export default App