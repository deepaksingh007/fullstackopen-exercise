import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/user.reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import blogService from '../services/blogs'
import { Menu, Button, Icon } from 'semantic-ui-react'


const Navigation = (props) => {
  const { user, logout, history } = props
  if(!user) return null
  const padding = { paddingRight: 10 }
  // const menuStyle = { display: 'flex', flexDirection: 'row' }

  const handleLogout = () => {
    window.localStorage.removeItem('userPrinciple')
    blogService.setToken(null)
    history.push('/')
    logout()
  }
  return (
    <Menu secondary>
      <Menu.Item link>
        <Link style={padding} to="/">Home</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link style={padding} to="/users">User</Link>
      </Menu.Item>
      <Menu.Item position="right">
        <div>
          {user.username} logged in
        </div>
      </Menu.Item>
      <Menu.Item
        name="logout"
        onClick={handleLogout}
      >
        <Button icon>
          <Icon name='power off' />
        </Button>
      </Menu.Item>
    </Menu>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
