import axios from 'axios';

const getPersons = () => axios.get('http://localhost:3001/persons').then(({data}) => data);
const addNewPerson = newPerson => axios.post('http://localhost:3001/persons', newPerson).then(({data})=> data);

export default {getPersons, addNewPerson};