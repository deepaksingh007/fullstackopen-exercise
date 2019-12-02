import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/bloglist.reducer'
import { logout } from '../reducers/user.reducer'

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
      {bloglist && bloglist.map((blog, index) => (<Blog blog={blog} key={blog.title + index} />))}
    </div>)
}
const mapStateToProps = (state) => ({ user: state.user, bloglist: state.bloglist })
const mapDispatchToProps = { logout, createBlog }
export const ConnectedBloglist = connect(mapStateToProps, mapDispatchToProps)(Bloglist)
