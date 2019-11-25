import { getAll, createAnecdote } from "../services/anecdoteService"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

export const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
      case 'VOTE': {
        const newState = state.map(
            note => note.id === action.data.id ? {...note, votes: note.votes + 1} : {...note}
        )
        return newState
      }
      case 'CREATE': {
        const newState = state.concat({...action.data})
        return newState
      }
      case 'INIT': {
        return [...action.data.anecdotes]
      }
      default: return state
  }
}

export const vote = (id) => ({
    type: 'VOTE',
    data: {
        id
    }
})

export const createNote = (anecdote) => {
    return async (dispatch) => {
        const anecdoteObj = await createAnecdote(anecdote)
        dispatch({
            type: 'CREATE',
            data: anecdoteObj
        })
    }
}

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await getAll()
        console.log(anecdotes)
        dispatch({
            type: 'INIT', 
            data:{
                anecdotes}
            })
    }
}

        