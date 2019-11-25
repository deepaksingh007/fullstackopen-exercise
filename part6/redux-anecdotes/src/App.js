import React from 'react';
import {vote, createNote} from './reducers/anecdoteReducer'

const App = (props) => {
  const {store} = props
  const anecdotes = store.getState()

  const addVotes = (id) => {
    store.dispatch(vote(id))
  }

  const createAnecdoteNote = (event) => {
      event.preventDefault()
      store.dispatch(createNote(event.target.note.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVotes(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdoteNote}>
        <div><input name="note" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App