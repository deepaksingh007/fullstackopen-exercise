import loginService from '../services/login'
import blogService from '../services/blogs'
const initialState = null
export const userReducer = (state= initialState, action) => {
  console.log(action)
  switch(action.type){
  case 'LOGIN_SUCCESS': return { ...action.data }
  case 'LOGOUT': return initialState
  case 'INIT_USER': return { ...action.data }
  default: return state
  }
}

export const login = (user) => {
  return async dispatch => {
    try{
      const response = await loginService.login(user)
      const { token, ...userInfo } = response
      window.localStorage.setItem('userPrinciple', JSON.stringify(response))
      blogService.setToken(token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        data: userInfo
      })
    }catch(exception){
      console.log(exception)
    }
  }
}

export const initUser = (user) => ({ type: 'INIT_USER', data: user })

export const logout = () => ({ type: 'LOGOUT' })