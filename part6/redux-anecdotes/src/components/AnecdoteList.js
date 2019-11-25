import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes;
    const addVotes = ({id, content}) => {
        props.vote(id)
        props.setNotification(`You voted '${content}'`)
        setTimeout(() => {
            props.setNotification('')
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

const mapStateToProps = (state) => ({anecdotes: state.anecdotes})
const mapDispatchToProps = {vote, setNotification}
const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList