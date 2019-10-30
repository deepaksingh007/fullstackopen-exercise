import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => axios.get(baseUrl).then(({data}) => data);
const addNewPerson = newPerson => axios.post(baseUrl, newPerson).then(({data})=> data);
const deletePerson = person => axios.delete(`${baseUrl}/${person.id}`);

export default {getPersons, addNewPerson, deletePerson};