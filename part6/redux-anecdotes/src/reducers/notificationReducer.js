const initialState = {
    message: ''
}

export const notificationReducer = (state= initialState, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION': return {message: action.data.message}
        default: return {...state}
    }
}

export const setNotification = (message) => {
    return async dispatch => {
        dispatch({type: 'SET_NOTIFICATION', data:{message}})
        await timeout(5000)
        dispatch({type: 'SET_NOTIFICATION', data:{message: ''}})
    }
}

const timeout = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}