import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {anecdoteReducer} from './reducers/anecdote.reducer'
import {notificationReducer} from './reducers/notification.reducer'

const reducer = combineReducers(
    {
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })

const store = createStore(reducer, applyMiddleware(thunk))

export default store