import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef( (props, ref) => {
  const { children, buttonLabel } = props
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })
  return(
    <div>
      <button style={{ display: !visible ? '': 'none' }} onClick={toggle}>{buttonLabel}</button>
      <div style={{ display: visible ? '': 'none' }}>
        {children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
}
)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

