import React, {useEffect} from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {getAll} from './services/anecdoteService'
import {initAnecdotes} from './reducers/anecdoteReducer'
import {connect} from 'react-redux'

const App = (props) => {
  useEffect(() => {
    const fetchAll = async () => {
        const anecdotes = await getAll()
        props.initAnecdotes(anecdotes)
    }
    fetchAll()
  })
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification ></Notification>
      <AnecdoteList ></AnecdoteList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

const mapDispatchToProp = {initAnecdotes}
const connectedApp = connect(null, mapDispatchToProp)(App)
export default connectedApp