import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = (user) => {
  const userTrimmed = {
    username: user.username.trim(),
    password: user.password.trim()
  }
  const request = axios.post(baseUrl, userTrimmed).then(({ data }) => data)
  return request
}

export default { login }