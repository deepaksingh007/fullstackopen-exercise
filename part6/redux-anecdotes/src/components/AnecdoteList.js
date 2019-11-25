import React from 'react'
import {vote} from '../reducers/anecdoteReducer'

const AnecdoteList = ({store}) => {
    const anecdotes = store.getState();
    const addVotes = (id) => {
        store.dispatch(vote(id))
      }
    return (
    <div>
        <h2>create new</h2>
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
    </div>
)
}

export default AnecdoteList