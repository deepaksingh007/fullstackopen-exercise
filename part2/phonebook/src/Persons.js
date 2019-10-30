import React from 'react';

const Person = ({ person, deletePerson }) => {
    return person ? (<p key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>) : null
};

const Persons = ({ persons, filter, deletePerson }) => {
    if (!persons) return null;
    const isPersonMatched = (person, filterValue) => !!person.name.toLowerCase().match(filterValue.toLowerCase());
    const personsFiltered = persons.filter(person => isPersonMatched(person, filter));
    return (
        <div>
            {personsFiltered.map(person => (<Person key={person.name} person={person} deletePerson={deletePerson} />))}
        </div>
    );
};
export default Persons;

