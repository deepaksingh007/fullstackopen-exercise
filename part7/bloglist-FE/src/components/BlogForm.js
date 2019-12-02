import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const BlogForm = ({ handleCreate }) => {
  const { reset: resetTitle ,...title } = useField({ id: 'title', type: 'text' })
  const { reset: resetAuthor ,...author } = useField({ id: 'author', type: 'text' })
  const { reset: resetUrl ,...url } = useField({ id: 'url', type: 'text' })
  const reset = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }
  const onClick = () => {
    handleCreate({
      title: title.value,
      author: author.value,
      url: url.value
    }, reset)
  }
  return (
    <div>
      <p>
        <label htmlFor="title">title:</label>
        <input {...title}/>
      </p>
      <p>
        <label htmlFor="author">author:</label>
        <input {...author}/>
      </p>
      <p>
        <label htmlFor="url">url:</label>
        <input {...url}/>
      </p>
      <button onClick={onClick}>create</button>
    </div>
  )
}

BlogForm.prototype = {
  handleCreate: PropTypes.func.isRequired
}
export default BlogForm