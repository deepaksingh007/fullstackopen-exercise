import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from 'react-apollo'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, BOOKS_BY_GENRE } from './graphql/query'
import { BOOK_ADDED } from './graphql/subscription'


const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
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
    client.clearStore()
    setPage('login')
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      window.alert(`${JSON.stringify(subscriptionData.data.bookAdded)}`)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      updateAuthors(addedBook)
    }
  })
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      {
        const included = set.map(book => book.title).includes(object.title)
        return included
      }  
    try{
      const allBooksInStore = client.readQuery({ query: BOOKS_BY_GENRE, variables:{genre: null} })
      if (!includedIn(allBooksInStore.allBooks, addedBook)) {
        allBooksInStore.allBooks = allBooksInStore.allBooks.concat(addedBook)
        console.log(allBooksInStore.allBooks)
        client.writeQuery({
          query: BOOKS_BY_GENRE,
          data: allBooksInStore,
          variables: {genre: null}
        })
      }
    }catch(exception){
      console.log(exception)
      client.query({ query: BOOKS_BY_GENRE, variables:{genre: null} })
      return exception
    }
  }

  const updateAuthors=(addedBook) => {
    try{
      const includedIn = (set, object) => 
    {
      const included = set && set.map(author => author.name).includes(object.name)
      return included
    } 
    const allAuthorssInStore = client.readQuery({ query: ALL_AUTHORS })
    if (includedIn(allAuthorssInStore.allAuthors, addedBook.author) === false) {
      const newAuthor = {name: addedBook.author.name, born: null, bookCount: 1, __typename: "Author"}
      allAuthorssInStore.allAuthors = allAuthorssInStore.allAuthors.concat(newAuthor)
      console.log(allAuthorssInStore.allAuthors)
      client.writeQuery({
        query: ALL_AUTHORS,
        data: allAuthorssInStore
      })
    }
    else if(includedIn(allAuthorssInStore.allAuthors, addedBook.author) === true)
      {
        allAuthorssInStore.allAuthors = allAuthorssInStore.allAuthors.map(
          author => author.name === addedBook.author.name ? {...author, bookCount: author.bookCount +1} : author
        )
        client.writeQuery({
          query: ALL_AUTHORS,
          data: allAuthorssInStore
        })
      }
      else return  
    }catch(exception){
      console.log(exception)
      client.query(ALL_AUTHORS)
    }
    
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