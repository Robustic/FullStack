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

const MessageSuccess = ({ message }) => {
    if (message === null) {
        return null
    }

    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

const MessageError = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
    }

    const errorMessageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={errorMessageStyle}>
            {errorMessage}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personExistsList = persons.filter(person => (person.name === newName))
        if (personExistsList.length > 0) {
            const personExists = personExistsList[0]
            const id = personExists.id
            const updatePersonObject = { ...personExists, number: newNumber }
            personService
                .update(id, updatePersonObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                    setMessage(`Updated number for '${returnedPerson.name}'`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
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
                    setMessage(`Added '${returnedPerson.name}'`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleDelete = (id, name, setPersons) => {
        if (window.confirm(`Delete contact ${name} ?`)) {
            personService
                .deleteOne(id)
                .then(error => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage(`Deleted '${name}'`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Information of '${name}' has already been removed from server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(person => person.id !== id))
                })
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
            <MessageSuccess
                message={message}
            />
            <MessageError
                errorMessage={errorMessage}
            />
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