import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import { create, destroy, getAll, update } from "./services";
import Notification from './components/Notification';


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [className, setClassName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newName) {
      alert("Name or Number can not be empty!");
      return;
    }

    const found = persons.find(persons => persons.name === newName);
    if (found) {
      if (newNumber === found.number) {
        alert(`${newName} is already to phonebook!`)
        return;
      } else {
        if (window.confirm(`${newName} is already addested to phonebook, replace the old number with the new one ?`))
          update(found.id, { name: newName, number: newNumber, id: found.id })
            .then(response => { })
            .catch(error => console.log(error.message));
        return;
      }
    }

    let newPerson = { name: newName, number: newNumber }
    create(newPerson).then((response) => {
      setPersons(prevState => [...prevState, { ...response }]);
      setNewName("");
      setNewNumber("");
      setNotification(`Added ${newName}`);
      setClassName("success")
      setTimeout(() => {
        setNotification(null)
        setClassName("")
      }, 5000);
    }).catch((error) => console.log(error.message));

  }
  const handleChange = (event) => {
    if (event.target.name === "name") {
      setNewName(event.target.value);
    }
    else {
      setNewNumber(event.target.value);
    }
  }
  const handleSearch = (event) => {
    const search = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setPersons(search);
    if (event.target.value === "") {
      setPersons(copyState);
    }
  }

  useEffect(() => {
    getAll().then(persons => {
      setPersons(persons);
    }).catch(err => console.log(err.message));

  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} className={className} />
      <Filter handleSearch={handleSearch} /> <br />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleChange={handleChange} name={newName} number={newNumber} />
      <h1>Numbers</h1>
      <Persons persons={persons} destroy={destroy} setPersons={setPersons} setNotification={setNotification} setClassName={setClassName } />
    </div>
  )
}

export default App



