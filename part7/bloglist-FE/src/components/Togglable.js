import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

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
      <Button style={{ display: !visible ? '': 'none' }} onClick={toggle}>{buttonLabel}</Button>
      <div style={{ display: visible ? '': 'none' }}>
        {children}
        <Button onClick={toggle}>cancel</Button>
      </div>
    </div>
  )
}
)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

