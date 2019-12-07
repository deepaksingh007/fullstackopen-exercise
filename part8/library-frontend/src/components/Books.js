import React, {useState} from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {ALL_BOOKS} from '../graphql/query'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  if (!props.show) {
    return null
  }
  return (
    <Query query={ALL_BOOKS}>
      {(result) => {
        if (result.loading) {
          return <p>loading</p>
        }
        else {
          const { allBooks: books } = result.data
          const bookGeneres = books.reduce((acc, cur) => {
            cur.genres.forEach(genre => acc.includes(genre) ? null : acc.push(genre) )
            return acc
          }, [])
          console.log(bookGeneres)
          return (
            <div>
              <h2>books</h2>
              {filter ? `in genre ${filter}` : null}
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>
                      author
                  </th>
                    <th>
                      published
                  </th>
                  </tr>
                  {books.map(book => !filter || book.genres.includes(filter) ?
                    <tr key={book.title}>
                      <td>{book.title}</td>
                      <td>{book.author.name}</td>
                      <td>{book.published}</td>
                    </tr> :
                    null
                  )}
                </tbody>
              </table>
              {bookGeneres.map(genere => <button key={genere} onClick={() => setFilter(genere)}>{genere}</button>)}
            </div>
            
          )
        }
      }}
    </Query>
  )
}

export default Books