import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createNote} from '../reducers/anecdoteReducer'
import{connect} from 'react-redux' 

const AnecdoteForm = (props) => {
    const createAnecdoteNote = async (event) => {
        event.preventDefault()
        const note = event.target.note
        props.createNote(note.value)
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