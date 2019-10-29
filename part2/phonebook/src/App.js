import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const addNumber = event => {
    event.preventDefault();
    setPersons(
                persons.concat({name: newName})
              );
  };
  const handleNewPerson = event => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleNewPerson}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons && persons.map(person => (<p key={person.name}>{person.name}</p>))}
    </div>
  );
};

export default App;