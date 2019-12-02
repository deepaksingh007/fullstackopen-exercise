import React from 'react'
import { connect } from 'react-redux'
import { initUser, login, logout } from '../reducers/user.reducer'
import { List } from 'semantic-ui-react'
const User = (props) => {
  const { user } = props
  if(!user) return null
  console.log(user)
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <List bulleted>
        {user.blogs.map((blog) => (<List.Item key={blog.id}>{blog.title}</List.Item>))}
      </List>
    </div>)
}
const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {  login, initUser, logout }

export default connect(mapStateToProps, mapDispatchToProps)(User)