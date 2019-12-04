import React, {useState} from 'react'
const AuthorForm = (props) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')
  const { editAuthor } = props
  const submit = (event) => {
    event.preventDefault()
    editAuthor({variables: {name, born: parseInt(born, 10)}})
    setBorn('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <p>
          <label htmlFor='name'>name</label>
          <input type='text' value={name} onChange={({target}) => setName(target.value)}/>
        </p>
        <p>
          <label htmlFor='birthday'>born</label>
          <input type='number' value={born} onChange={({target}) => setBorn(target.value)}/>
        </p>
        <button type='submit'>update author</button>
      </form>
    </div>

  )
}

export default AuthorForm