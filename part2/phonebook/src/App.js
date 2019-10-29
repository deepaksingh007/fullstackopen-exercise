import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons && persons.map(person => (<p key={person.name}>{person.name} {person.number}</p>))}
    </div>
  );
};

export default App;