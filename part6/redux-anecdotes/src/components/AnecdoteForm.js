import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createNote} from '../reducers/anecdoteReducer'
import{connect} from 'react-redux' 
import {createAnecdote} from '../services/anecdoteService'

const AnecdoteForm = (props) => {
    const createAnecdoteNote = async (event) => {
        event.preventDefault()
        const note = event.target.note
        const anecdote = await createAnecdote(note.value)
        console.log(anecdote)
        props.createNote(anecdote)
        props.setNotification(`You added ${note.value}`)
        setTimeout(() => {
            props.setNotification('')
        }, 5000);
        note.value = ''
    }
    return (      
    <form onSubmit={createAnecdoteNote}>
        <div><input name="note" /></div>
        <button>create</button>
    </form>)
}

const mapDispatchToProps = {createNote, setNotification}
const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm