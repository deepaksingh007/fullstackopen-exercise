import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
const Blog = ({ blog }) => {
  if(!blog) return null
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </List.Header>
        <List.Description>
          {`written by ${blog.author}`}
        </List.Description>
      </List.Content>


    </List.Item>
  )
}
Blog.prototype = {
  blog: PropTypes.object.isRequired
}
export default Blog