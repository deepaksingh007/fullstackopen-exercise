import React, { useState } from 'react'
import Select from 'react-select'
interface Option{
  value: string
}
const AuthorForm = (props) => {
  const [born, setBorn] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<Option>(null)
  const { editAuthor, authors} = props
  const options = authors && authors.map(author => ({value: author.name, label: author.name}))
  const submit = (event) => {
    event.preventDefault()
    if(selectedOption) editAuthor({variables: {name: selectedOption!.value, born: parseInt(born, 10)}})
    setBorn('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='name'>name</label>
          <Select
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          options={options}
          ></Select>
        </div>
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