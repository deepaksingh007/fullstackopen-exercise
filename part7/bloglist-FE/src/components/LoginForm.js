import React from 'react'
import { useField } from '../hooks/index'
import ProtoType from 'prop-types'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { login } from '../reducers/user.reducer'

const LoginForm = (props) => {
  const { reset: resetUsername, ...username } = useField({ id: 'username', type: 'text' })
  const { reset: resetPassowrd, ...password } = useField({ id: 'password', type: 'text' })
  const reset = () => {
    resetUsername()
    resetPassowrd()
  }
  const handleSubmit = (login, reset) => {
    props.login(login)
    reset()
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const login = { username: username.value, password: password.value }
    handleSubmit(login, reset)
  }
  return (
    <Togglable buttonLabel='login'>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='username'>username</label>
          <input {...username} />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input {...password} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </Togglable>
  )
}

LoginForm.prototype = {
  handleSubmit: ProtoType.func.isRequired
}

const mapDispatchToProps = { login }
export const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)