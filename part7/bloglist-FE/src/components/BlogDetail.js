import React from 'react'
import { updateBlog } from '../reducers/bloglist.reducer'
import { connect } from 'react-redux'
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

      <form onSubmit={handleSubmit}>
        <p>
          <input name='comment' type='text'/><button type='submit'>add comment</button>
        </p>
      </form>

      <ul>
        {blog.comments.map((comment, index) => <li key={comment + index}>{comment}</li>)}
      </ul>
    </div>
  )
}
const mapDispatchToProps = { updateBlog }
export default connect(null, mapDispatchToProps)(BlogDetail)