import React, { useState } from 'react'
import { CREATE_BOOK } from '../graphql/mutations/book'
import { useMutation } from 'react-apollo'

type NewBookProps = {show: boolean}
const NewBook: React.FC<NewBookProps> = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const handleError = (error) => console.log(error)
  const [addBook] = useMutation(CREATE_BOOK, { onError: handleError })
  if (!props.show) {
    return null
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const submit = async (e) => {
    e.preventDefault()
    addBook({ variables: { title, published: parseInt(published, 10), author, genres } })
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

export default NewBook