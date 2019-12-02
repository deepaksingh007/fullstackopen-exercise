import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { ConnectedBloglist } from './components/Bloglist'
import { ConnectedLoginForm } from './components/LoginForm'
import { ConnectedUsers } from './components/Users'
import { createBlog, initialiseBloglist, bloglistReducer } from './reducers/bloglist.reducer'
import { initialiseUsers } from './reducers/users.reducer'
import { initUser, login, logout } from './reducers/user.reducer'
import blogService from './services/blogs'
import User from './components/User'
import Logout from './components/Logout'
import BlogDetail from './components/BlogDetail'
import Navigation from './components/Menu'
import { Container } from 'semantic-ui-react'

function App(props) {
  const { user, users, bloglist } = props
  const padding = { paddingRight: 10 }

  useEffect(
    () => {
      props.initialiseBloglist()
    },
    [user]
  )
  // initialize user and token from local storage
  useEffect(() => {
    const userPrinciple = window.localStorage.getItem('userPrinciple')
    console.log(userPrinciple)
    if (userPrinciple) {
      const { token, ...userInfo } = JSON.parse(userPrinciple)
      blogService.setToken(token)
      props.initUser(userInfo)
    }
  }, [])
  useEffect(() => {
    props.initialiseUsers()
  }, [])
  const userById = (id) => {
    const user = users && users.find(user => user.id === id)
    console.log(user)
    return user
  }
  const blogById = (id) => {
    const blog = bloglist && bloglist.find(blog => blog.id === id)
    console.log(blog)
    return blog
  }
  return (
    <Router>
      <Container className="App">
        <Navigation/>
        <h1>blog app</h1>
        <Route exact path="/" render={() => user ? <ConnectedBloglist /> : <ConnectedLoginForm />}></Route>
        <Route exact path="/users" render={() => user ? <ConnectedUsers /> : <ConnectedLoginForm/>}></Route>
        <Route path="/users/:id" render={({ match }) => user ? <User user={userById(match.params.id)} /> : <ConnectedLoginForm />}></Route>
        <Route path="/blogs/:id" render={({ match }) => user ? <BlogDetail blog={blogById(match.params.id)}/> : <ConnectedLoginForm />}></Route>
      </Container>
    </Router>

  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  bloglist: state.bloglist,
  users: state.users,
})

const mapDispatchToProps = { initialiseBloglist, createBlog, login, initUser, logout, initialiseUsers }

export default connect(mapStateToProps, mapDispatchToProps)(App)
