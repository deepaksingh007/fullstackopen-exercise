import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createNote} from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
    const createAnecdoteNote = (event) => {
        event.preventDefault()
        store.dispatch(createNote(event.target.note.value))
        store.dispatch(setNotification(`You added ${event.target.note.value}`)) 
        event.target.note.value = ''
    }
    return (      
    <form onSubmit={createAnecdoteNote}>
        <div><input name="note" /></div>
        <button>create</button>
    </form>)
}

export default AnecdoteForm