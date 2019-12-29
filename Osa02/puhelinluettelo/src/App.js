import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
    return (
        <p>{props.name} {props.number}</p>
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
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
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
            axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
            // setPersons(persons.concat(personObject))
            // setNewName('')
            // setNewNumber('')
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
            />
        </div>
    )
}

export default App