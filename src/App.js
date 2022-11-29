import React, { useState, useEffect } from "react"
import communications from "./services/communications"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [notificationMessage, setNotificationMessage] = useState({ message: null, success: true })

    const showNotification = (message, success) => {
        setNotificationMessage({ message, success })
        setTimeout(() => {
            setNotificationMessage({ message: null, success: true })
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const oldPerson = persons.find((element) => element.name === newName)
        if (oldPerson !== undefined) {
            if (window.confirm((`${newName} is already added to phonebook. Replace the old number with a new one?`))) {
                const changedPerson = { ...oldPerson, number: newNumber }

                communications
                    .update(oldPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
                        setNewName("")
                        setNewNumber("")
                        showNotification(`Changed number for ${returnedPerson.name}`, true)
                    })
                    .catch(() => {
                        setNewName("")
                        setNewNumber("")
                        showNotification(`Failed to change number for ${oldPerson.name}, they were already removed from server.`, false)
                        setPersons(persons.filter(p => p.id !== oldPerson.id))
                    })
            }
            else {
                setNewName("")
                setNewNumber("")
            }
            return
        }

        const nameObject = {
            name: newName,
            number: newNumber
        }

        communications
            .create(nameObject)
            .then(returnedName => {
                setPersons(persons.concat(returnedName))
                setNewName("")
                setNewNumber("")
                showNotification(`Added ${returnedName.name}`, true)
            })
    }

    const deletePerson = (event, person) => {
        event.preventDefault()

        if (window.confirm(`Delete ${person.name}?`)) {
            communications
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    showNotification(`Deleted ${person.name}`, true)
                })
                .catch(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    showNotification(`Failed to delete ${person.name}, they were already removed from server.`, false)
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

    useEffect(() => {
        communications
            .getAll()
            .then(initialNames => {
                setPersons(initialNames)
            })
    }, [])

    const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <Filter filter={filter} filterHandler={handleFilterChange} />
            <h2>Add a new number</h2>
            <AddForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <FilteredPersonList filteredPersons={filteredPersons} deleteHandler={deletePerson} />
        </div>
    )

}

const Filter = ({ filter, filterHandler }) => {
    return (
        <div>
            filter shown names with: <input value={filter} onChange={filterHandler} />
        </div>
    )
}

const AddForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const FilteredPersonList = ({ filteredPersons, deleteHandler }) => {
    return (
        <div>
            {filteredPersons.map(person => <Person person={person} deleteHandler={deleteHandler} key={person.name} />)}
        </div>
    )
}

const Person = ({ person, deleteHandler }) => {
    return (
        <p>
            {person.name} {person.number} <button onClick={event => deleteHandler(event, person)}>delete</button>
        </p>
    )
}

const Notification = ({ message }) => {
    if (message.message === null) {
        return null
    }

    return (
        <div className={message.success === true ? "success" : "error"}>
            {message.message}
        </div>
    )
}

export default App