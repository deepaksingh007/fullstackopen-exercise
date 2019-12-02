import React from 'react'
import { connect } from 'react-redux'
import { initUser, login, logout } from '../reducers/user.reducer'
const User = (props) => {
  const { user } = props
  if(!user) return null
  console.log(user)
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>)
}
const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {  login, initUser, logout }

export default connect(mapStateToProps, mapDispatchToProps)(User)