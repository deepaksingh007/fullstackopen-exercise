import React from 'react'
import { logout } from '../reducers/user.reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import blogService from '../services/blogs'

const Logout = (props) => {
  const { user, logout, history } = props
  const handleLogout = () => {
    window.localStorage.removeItem('userPrinciple')
    blogService.setToken(null)
    history.push('/')
    logout()
  }
  return user ? (
    <div>
      <p>{user.username} logged in </p>
      <p>
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  ) : null
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))