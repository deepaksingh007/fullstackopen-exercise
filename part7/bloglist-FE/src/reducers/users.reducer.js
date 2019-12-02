import usersService from '../services/users'
const initialState = null

export const usersReducer = (state=initialState, action) => {
  console.log(action)
  switch(action.type){
  case 'INIT_USERS': return [...action.data]
  default: return state
  }
}

export const initialiseUsers = () => {
  return async dispatch => {
    try{
      const users = await usersService.getUsers()
      dispatch({ type: 'INIT_USERS', data: users })
    }catch(exception){
      console.log(exception)
    }

  }
}