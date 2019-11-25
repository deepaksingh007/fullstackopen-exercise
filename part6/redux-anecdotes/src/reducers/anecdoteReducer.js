const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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
      default: return state
  }
}

export const vote = (id) => ({
    type: 'VOTE',
    data: {
        id
    }
})

export const createNote = (note) => {
    const action = {
            type: 'CREATE',
            data: {
                content: note,
                id: getId(),
                votes: 0
            }
        }
    return action
}