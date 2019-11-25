import React from 'react'

const Notification = ({store}) => {
    const {message} = store.getState().notification
    const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return message ? (
    <div style={style}>
      {store.getState().notification.message}
    </div>
  ) : null
}

export default Notification