import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
    const anecdotes = store.getState().anecdotes;
    const addVotes = ({id, content}) => {
        store.dispatch(vote(id))
        store.dispatch(setNotification(`You voted '${content}'`))
        setTimeout(() => {
            store.dispatch(setNotification(''))
          }, 5000)
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
            <button onClick={() => addVotes(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
)
}

export default AnecdoteList