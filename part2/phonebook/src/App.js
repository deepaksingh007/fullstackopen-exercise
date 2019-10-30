import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import personsService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [ persons, setPersons] = useState([]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [notification, setNotification] = useState(null);
  const addPerson = event => {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber};
    const personWithSameName = persons.find(person => person.name === newName);
    if(personWithSameName) {
       return window.confirm(`${newName} is already added to phonebook, replace the old number with  a new one?`) ?
       personsService.updatePerson(personWithSameName.id, newPerson)
       .then(data => {
           const newPersons = persons.map(person => person.id === data.id ? {...data} : person);
           setPersons(newPersons);
           setNotification({
            type: 'success',
            message: `Updated ${newPerson.name}`
           });
           setTimeout(() => setNotification(null), 2000);
       })
       .catch(({response}) => {
         if(!response || response.status !== 404 ) return null;
         setNotification(
           {
               type: 'error',
               message: `Information of ${newPerson.name} has already been removed from server`
            }) ;
         setTimeout(() => setNotification(null), 2000);
        }
       )
       : 
       null;

    }
    else {
        personsService.addNewPerson(newPerson)
        .then( data => {
           setPersons(persons.concat(data));
           setNotification({
            type: 'success',
            message: `Added ${newPerson.name}`
           });
           setTimeout(() => setNotification(null), 2000);
           setNewNumber('');
           setNewName('');
           });
    };
  };
  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handlerFilter = event => {
      const value = event.target.value;
      setFilter(value);  
    };
 const initPersons = () => {
     personsService.getPersons()
     .then(
         persons => setPersons(persons)
     )
     .catch(error => console.error(error));    
 };
 useEffect(initPersons, []);
 const deletePerson = personObject => {
     if(window.confirm(`Delete ${personObject.name}?`))
     {
         personsService.deletePerson(personObject)
         .then(() => setPersons(persons.filter(person => person.id !== personObject.id)))
         .catch(error => console.error(error));
    }
};
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter onChange={handlerFilter}/>
      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} onSubmit={addPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;