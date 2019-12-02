import { useState } from 'react'

export const useField = ({ id, type }) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  const reset = () => {
    console.log('reset')
    setValue('')
  }
  return {
    id,
    type,
    value,
    onChange,
    reset
  }
}