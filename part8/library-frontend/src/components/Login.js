import React from 'react'
import { useMutation } from 'react-apollo'
import {LOGIN} from '../graphql/mutations/login'

const Login = (props) => {
  const handleError = (error) => console.log(error)
  const [login] = useMutation(LOGIN, {onError: handleError})
  const {show, setToken, setPage} = props
  if(!show) return null
  const onSubmit = async (event) => {
    try{
      event.preventDefault()
      console.log(event.target.username.value, event.target.password.value)
      const username = event.target.username
      const password = event.target.password
      const result = await login({variables: {username:event.target.username.value, password: event.target.password.value}})
      username.value = ''
      password.value = ''
      if (result) {
        const token = result.data.login.value
        setToken(token)
        setPage('authors')
        console.log(token)
        localStorage.setItem('library-user-token', token)
      }
    }catch(exception){
      console.log(exception)
    } 
  }
  return (
    <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
      <div>
      <label htmlFor="username">username</label>
      <input name='username' type='text'/>
      </div>
      <div>
      <label htmlFor="password">password</label>
      <input name='password' type='text'/>
      </div>
      <button type='submit'>login</button>
    </form>
    </div>
  )
}
export default Login