import React, { useEffect, useState } from 'react'
import { useApolloClient } from 'react-apollo'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../graphql/queries/book'
import BooksTable from './BooksTable'

type BooksProps = {show: boolean}
const Books: React.FC<BooksProps> = (props) => {
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState(null)
  const [bookGenres, setBookGenres] = useState<string[]>(null)
  const client = useApolloClient()
  useEffect(() => {
    const getBooks = async () => {
      try {
        let response
        if (filter) {
          response = await client.query({ query: BOOKS_BY_GENRE, variables: { genre: filter } })
        }
        else {
          response = await client.query({ query: ALL_BOOKS })
          setBookGenres(getBookGeneres(response.data.allBooks))
        }
        setBooks(response.data.allBooks)
        console.log(response.data.allBooks)
      } catch (exception) {
        console.log(exception)
      }
    }
    getBooks()
  }, [filter])
  const getBookGeneres =(books) => books && books.reduce((acc, cur) => {
    cur.genres.forEach(genre => acc.includes(genre) ? null : acc.push(genre))
        return acc
}, [])
  if (!props.show) {
    return null
  }
  else if(!books){
    return <p>loading</p>
  }
  else return (
      <div>
        <h2>books</h2>
        {filter ? `in genre ${filter}` : null}
        <BooksTable filter={filter}></BooksTable>
        {bookGenres && (bookGenres as string[]).map(genere => <button key={genere} onClick={() => setFilter(genere)}>{genere}</button>)}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
  )
}

export default Books