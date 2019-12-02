import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import { createBlog } from '../reducers/bloglist.reducer'
import { logout } from '../reducers/user.reducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Bloglist = (props) => {
  const { bloglist, createBlog } = props
  const togglableRef = React.createRef()
  const handleCreate = async (newBlog, reset) => {
    createBlog(newBlog)
    togglableRef.current.toggle()
    reset()
  }
  return (
    <div>
      <Togglable buttonLabel={'new blog'} ref={togglableRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <List>
        {bloglist && bloglist.map((blog, index) => (<Blog blog={blog} key={blog.title + index} />))}
      </List>
    </div>)
}
const mapStateToProps = (state) => ({ user: state.user, bloglist: state.bloglist })
const mapDispatchToProps = { logout, createBlog }
export const ConnectedBloglist = connect(mapStateToProps, mapDispatchToProps)(Bloglist)
