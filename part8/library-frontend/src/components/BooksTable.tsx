import React from 'react'
import { useQuery } from 'react-apollo'
import { BOOKS_BY_GENRE } from '../graphql/queries/book'
const BooksTable = (props) => {
  const {filter} = props
  const {data, loading} = useQuery(BOOKS_BY_GENRE, {variables: {genre: filter}})
  if(loading)
  {return <p>loading</p>}
  else{
    const books = data.allBooks
    return (
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
    )
  }
 
}
export default BooksTable