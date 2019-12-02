import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = (tokenString) => token = `bearer ${tokenString}`
const getAll = () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}
const addBlog = (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const updateBlog = (id, blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, blog, config)
  return request.then(response => response.data)
}
export default { getAll, setToken, addBlog, updateBlog }