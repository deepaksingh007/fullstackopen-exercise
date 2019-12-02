import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  if(!blog) return null
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}
Blog.prototype = {
  blog: PropTypes.object.isRequired
}
export default Blog