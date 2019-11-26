const initialState = ''

export const notificationReducer = (state= initialState, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION': return  action.data.message
        default: return state
    }
}

export const setNotification = (message) => {
    return async dispatch => {
        dispatch({type: 'SET_NOTIFICATION', data:{message}})
        await timeout(10000)
        dispatch({type: 'SET_NOTIFICATION', data:{message: ''}})
    }
}

const timeout = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}