import { useState } from 'react'

export const useField = ({ id, type, name }) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  const reset = () => {
    console.log('reset')
    setValue('')
  }
  return {
    id,
    name,
    type,
    value,
    onChange,
    reset
  }
}