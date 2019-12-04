import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Books = (props) => {
  if (!props.show) {
    return null
  }
  const ALL_BOOKS = gql(`{
    allBooks{
      title
      author
      published
    }
  }`)
  return (
    <Query query={ALL_BOOKS}>
      {(result) => {
        if (result.loading) {
          return <p>loading</p>
        }
        else {
          const { allBooks: books } = result.data
          return (
            <div>
              <h2>books</h2>

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
                  {books.map(a =>
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author}</td>
                      <td>{a.published}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          )
        }
      }}
    </Query>
  )
}

export default Books