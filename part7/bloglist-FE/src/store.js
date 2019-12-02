import { createStore, combineReducers, applyMiddleware } from 'redux'
import { bloglistReducer } from './reducers/bloglist.reducer'
import  thunk  from 'redux-thunk'
import { userReducer } from './reducers/user.reducer'
import { usersReducer } from './reducers/users.reducer'

const reducer = combineReducers({ bloglist: bloglistReducer, user: userReducer, users: usersReducer })
const store = createStore(reducer, applyMiddleware(thunk))
export default store