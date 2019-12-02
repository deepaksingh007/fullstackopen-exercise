import React from 'react'
import { useField } from '../hooks/index'
import ProtoType from 'prop-types'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { login } from '../reducers/user.reducer'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const { reset: resetUsername, ...username } = useField({ id: 'username', type: 'text', name: 'username' })
  const { reset: resetPassowrd, ...password } = useField({ id: 'password', type: 'text', name: 'password' })
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
      <Form onSubmit={onSubmit} id='loginform'>
        <Form.Field>
          <label htmlFor='username'>username</label>
          <input {...username} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='password'>password</label>
          <input {...password} />
        </Form.Field>
        <Button type='submit'>submit</Button>
      </Form>
    </Togglable>
  )
}

LoginForm.prototype = {
  handleSubmit: ProtoType.func.isRequired
}

const mapDispatchToProps = { login }
export const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)