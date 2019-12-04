import { gql } from 'apollo-boost'
import React from 'react'
import { Query, Mutation } from 'react-apollo'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const ALL_AUTHORS = gql(`{
    allAuthors{
      name
      born
      bookCount
    }
  }`)

  const SET_BORN = gql(`
  mutation editBorn($name: String!, $born: Int!){
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
  `)
  const handleError = (error) => console.log(error)

  return (
    <div>
      <Query query={ALL_AUTHORS}>
        {(result) => {
          if (result.loading) {
            return <p>loading</p>
          }
          else {
            const { allAuthors: authors } = result.data
            return (
              <div>
                <h2>authors</h2>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>
                        born
                    </th>
                      <th>
                        books
                    </th>
                    </tr>
                    {authors.map(a =>
                      <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>)
          }
        }}
      </Query>
      <Mutation
        mutation={SET_BORN}
        onError={handleError}
        refetchQueries={[{query: ALL_AUTHORS}]}
      >
        {(editAuthor) => <AuthorForm editAuthor={editAuthor}></AuthorForm>}
      </Mutation>
    </div>
  )
}

export default Authors