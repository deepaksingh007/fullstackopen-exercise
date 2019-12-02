import blogService from '../services/blogs'
const initialState = null
export const bloglistReducer = (state= initialState, action) => {
  console.log(action)
  switch (action.type) {
  case 'INIT_BLOGLIST': return [...action.data]
  case 'UPDATE_BLOG': {
    const newState = state.map(blog => blog.id === action.data.blog.id ? { ...action.data.blog } : blog)
    console.log(newState)
    return newState
  }
  case 'ADD': return [...state , action.data]
  default: return state
  }
}

export const initialiseBloglist = () => {
  return async dispatch => {
    try{
      const bloglist = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGLIST',
        data: [...bloglist]
      })
    }catch(exception){
      console.log(exception)
    }
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try{
      const blogWithId = await blogService.addBlog(blog)
      dispatch({
        type: 'ADD',
        data: blogWithId
      })
    }catch(exception){
      console.log(exception)
    }

  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    try{
      await blogService.updateBlog(blog.id, { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes, comments: blog.comments })
      dispatch({ type: 'UPDATE_BLOG', data: { blog } })
    }catch(exception){
      console.log(exception)
    }
  }
}