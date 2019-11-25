import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  const {store} = props

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store}></AnecdoteList>
      <AnecdoteForm store={store}></AnecdoteForm>
    </div>
  )
}

export default App