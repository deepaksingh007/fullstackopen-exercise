import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNewWithHistory from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { createNote } from './reducers/anecdote.reducer'
import { setNotification } from './reducers/notification.reducer'

const App = (props) => {
  const anecdotes = props.anecdotes
  const notification = props.notification
  console.log(anecdotes, notification)
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    props.createNote(anecdote)
    props.setNotification(`a new anecdote ${anecdote.content} created !`)
  }

  const anecdoteById = (id) =>
    {
        const anecdoteFound = anecdotes.find(a => a.id === id)
        return anecdoteFound
    }

  return (

    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu></Menu>
        {notification ? <Notification message={notification}></Notification> : null}
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/create" render={() => <CreateNewWithHistory addNew={addNew}/>} />
        <Route path="/about" render={() => <About />} />
        <Route path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={anecdoteById(match.params.id)}/>} />
      </Router>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({anecdotes: state.anecdotes, notification: state.notification})
const mapDispatchToProps = {createNote, setNotification}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;