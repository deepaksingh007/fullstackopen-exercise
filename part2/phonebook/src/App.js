import React, { useState } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const App = () => {
  const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const addPerson = event => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
       return alert(`${newName} is already added to phonebook`);
    }
    else {
        const newPersons =  persons.concat({name: newName, number: newNumber});
        setPersons(newPersons);
    };
  };
  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handlerFilter = event => {
      const value = event.target.value;
      setFilter(value);  
    };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handlerFilter}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  );
};

export default App;