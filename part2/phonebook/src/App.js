import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const App = () => {
  const [ persons, setPersons] = useState([]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const addPerson = event => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
       return alert(`${newName} is already added to phonebook`);
    }
    else {
        const newPerson = {name: newName, number: newNumber};
        axios.post('http://localhost:3001/persons', newPerson)
        .then( ({data}) => {
           setPersons(persons.concat(data));
           setNewNumber('');
           setNewName('');
           })
    };
  };
  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handlerFilter = event => {
      const value = event.target.value;
      setFilter(value);  
    };
 const initPersons = () => {
     axios.get('http://localhost:3001/persons')
     .then(
         ({data}) => setPersons(data),
         error => console.error(error)
     )    
 };
 useEffect(initPersons, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handlerFilter}/>
      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} onSubmit={addPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  );
};

export default App;