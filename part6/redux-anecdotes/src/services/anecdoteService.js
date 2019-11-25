import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'
export const getAll = () => axios.get(baseUrl).then(response => {
    return response.data
})

export const createAnecdote = (anecdote) => axios.post(baseUrl, newAnecdote(anecdote)).then(response => response.data)

const newAnecdote = (note) => ({content: note, id: getId(),votes: 0})
const getId = () => (100000 * Math.random()).toFixed(0)

