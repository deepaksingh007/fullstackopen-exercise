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
    const action = {
            type: 'CREATE',
            data: anecdote
        }
    return action
}

export const initAnecdotes = (anecdotes) => (
    {
        type: 'INIT', 
        data:{
            anecdotes}
        })