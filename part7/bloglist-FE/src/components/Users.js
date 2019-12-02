import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
const Users = (props) => {
  const users = props.users

  return (<div>
    <h1>Users</h1>
    <Table id='usersTable'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            user
          </Table.HeaderCell>
          <Table.HeaderCell>
            blogs created
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users && users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell> <Link to={`/users/${user.id}`}> {user.name}</Link> </Table.Cell>
            <Table.Cell>{user.blogs && user.blogs.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>)
}

const mapStateToProps = (state) => ({ users: state.users })

export const ConnectedUsers = connect(mapStateToProps, null)(Users)