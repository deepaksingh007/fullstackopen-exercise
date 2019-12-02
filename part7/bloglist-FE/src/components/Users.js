import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = (props) => {
  const users = props.users

  return (<div>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
          <th></th><th>blogs created</th>
        </tr>
        {users && users.map(user => (
          <tr key={user.id}>
            <td> <Link to={`/users/${user.id}`}> {user.name}</Link> </td>
            <td>{user.blogs && user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}

const mapStateToProps = (state) => ({ users: state.users })

export const ConnectedUsers = connect(mapStateToProps, null)(Users)