import React from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { ALL_AUTHORS } from '../graphql/queries/author'
import AuthorForm from './AuthorForm'
import {SET_BORN} from '../graphql/mutations/author'
import {SetBornVariables} from "../graphql/mutations/mutations.shapes";

type AuthorsProps = {
  show: boolean
}
const Authors: React.FC<AuthorsProps> = (props) => {
  const { loading, data, error } = useQuery(ALL_AUTHORS)
  const handleError = (error) => console.log(error)
  const [editAuthor] = useMutation<{}, SetBornVariables>(SET_BORN, {refetchQueries: [{ query: ALL_AUTHORS }], onError: handleError})
  if (!props.show) {
    return null
  }

  if(error){
    console.log(error)
  }


  if (loading) {
    return <p>loading</p>
  }
  else {
    const { allAuthors: authors } = data
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
         <AuthorForm authors={authors} editAuthor={editAuthor}></AuthorForm>
      </div>)
  }
}

export default Authors