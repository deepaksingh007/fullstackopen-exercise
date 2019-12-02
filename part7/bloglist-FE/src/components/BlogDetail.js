import React from 'react'
import { updateBlog } from '../reducers/bloglist.reducer'
import { connect } from 'react-redux'
import { Form, Button, List } from 'semantic-ui-react'
const BlogDetail = (props) => {
  const { blog, updateBlog } = props
  if(!blog) return null
  console.log(blog)
  const handleSubmit= (event) => {
    event.preventDefault()
    console.log(event.target.comment.value)
    updateBlog({ ...blog, comments: [...blog.comments, event.target.comment.value] })
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {`${blog.likes} likes`}<button>like</button>
      </p>
      <p>
        {`added by ${blog.user.name}`}
      </p>
      <h3>comments</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input name='comment' type='text'/>
          <Button type='submit'>
            add comment
          </Button>
        </Form.Field>
      </Form>
      <List bulleted>
        {blog.comments.map((comment, index) => <List.Item key={comment + index}>{comment}</List.Item>)}
      </List>
    </div>
  )
}
const mapDispatchToProps = { updateBlog }
export default connect(null, mapDispatchToProps)(BlogDetail)