import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const CREATE_BOOK = gql(`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author
    }
  }`)

  return (
    <Mutation mutation={CREATE_BOOK}>
      {
        (addBook ) => {
          const submit = async (e) => {
            e.preventDefault()
            addBook({ variables: {title, published: parseInt(published, 10), author, genres}})
            setTitle('')
            setPublished('')
            setAuhtor('')
            setGenres([])
            setGenre('')
          }
          return (
            <div>
              <form onSubmit={submit}>
                <div>
                  title
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </div>
                <div>
                  author
                <input
                    value={author}
                    onChange={({ target }) => setAuhtor(target.value)}
                  />
                </div>
                <div>
                  published
                <input
                    type='number'
                    value={published}
                    onChange={({ target }) => setPublished(target.value)}
                  />
                </div>
                <div>
                  <input
                    value={genre}
                    onChange={({ target }) => setGenre(target.value)}
                  />
                  <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                  genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
              </form>
            </div>
          )
        }
      }
    </Mutation>

  )
}

export default NewBook