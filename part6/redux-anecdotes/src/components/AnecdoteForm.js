import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createNote} from '../reducers/anecdoteReducer'
import{connect} from 'react-redux' 

const AnecdoteForm = (props) => {
    const createAnecdoteNote = (event) => {
        event.preventDefault()
        props.createNote(event.target.note.value)
        props.setNotification(`You added ${event.target.note.value}`)
        setTimeout(() => {
            props.setNotification('')
        }, 5000);
        event.target.note.value = ''
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