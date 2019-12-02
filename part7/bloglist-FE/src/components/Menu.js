import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/user.reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import blogService from '../services/blogs'


const Menu = (props) => {
  const { user, logout, history } = props
  if(!user) return null
  const padding = { paddingRight: 10 }
  const menuStyle = { display: 'flex', flexDirection: 'row' }

  const handleLogout = () => {
    window.localStorage.removeItem('userPrinciple')
    blogService.setToken(null)
    history.push('/')
    logout()
  }
  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/users">User</Link>
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))
