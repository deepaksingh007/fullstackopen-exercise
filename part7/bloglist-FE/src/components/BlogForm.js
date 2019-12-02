import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { Form, Button } from 'semantic-ui-react'

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
      <Form>
        <Form.Field>
          <label htmlFor="title">title:</label>
          <input {...title}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="author">author:</label>
          <input {...author}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="url">url:</label>
          <input {...url}/>
        </Form.Field>
        <Button onClick={onClick}> create</Button>
      </Form>
    </div>
  )
}

BlogForm.prototype = {
  handleCreate: PropTypes.func.isRequired
}
export default BlogForm