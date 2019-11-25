import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
    const message = props.message
    const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return message ? (
    <div style={style}>
      {message}
    </div>
  ) : null
}

const mapStateToProps = (state) => ({message: state.notification.message})
const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification