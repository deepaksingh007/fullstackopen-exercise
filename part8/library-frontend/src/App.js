import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('library-user-token')
    if(token){
      setToken(token)
      setPage('authors')
    }
  }, [])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('login')
  }
  return (

    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={logout}>logout</button>: <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Login
      show={page==='login'}
      setToken={setToken}
      setPage={setPage}
      ></Login>
      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {token ? <NewBook
        show={page === 'add'}
      /> :
      null
    }

    </div>
  )
}

export default App