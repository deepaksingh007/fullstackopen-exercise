import React from 'react';

const Person = ({person}) => person ? (<p key={person.name}>{person.name} {person.number}</p>) : null;

const Persons = ({persons, filter}) => {
    if(!persons) return null;
    const isPersonMatched = (person, filterValue) => !!person.name.toLowerCase().match(filterValue.toLowerCase());
    const personsFiltered = persons.filter(person => isPersonMatched(person, filter));
    return (
            <div>
                {personsFiltered.map(person => (<Person key={person.name} person ={person}/>))}
            </div>
            );
};
export default Persons;

