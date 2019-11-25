const initialState = {
    message: ''
}

export const notificationReducer = (state= initialState, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION': return {message: action.data.message}
        default: return {...state}
    }
}

export const setNotification = (message) => ({type: 'SET_NOTIFICATION', data:{message}})