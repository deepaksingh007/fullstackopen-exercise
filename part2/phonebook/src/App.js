import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personsFiltered, setPersonsFiltered ] = useState([...persons]);
  const addNumber = event => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
       return alert(`${newName} is already added to phonebook`);
    }
    else return setPersons(
        persons.concat({name: newName, number: newNumber})
      );
  };
  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handlerFilter = event => {
      const value = event.target.value;
      const personsFiltered = persons.filter(person => !!person.name.toLowerCase().match(value.toLowerCase()));
      setPersonsFiltered(personsFiltered);
    };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handlerFilter} />
      <h3>add a new</h3>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleNewName}/>
        </div>
        <div>
          number: <input type="tel" onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsFiltered && personsFiltered.map(person => (<p key={person.name}>{person.name} {person.number}</p>))}
    </div>
  );
};

export default App;