import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {split} from 'apollo-link'
import {getMainDefinition} from 'apollo-utilities'
import {WebSocketLink} from 'apollo-link-ws'


const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {reconnect: true}
})
const link = split(({query}) => {
  const definition = getMainDefinition(query)
  return definition.kind === 'OperationDefinition' && definition.operation=== 'subscription'
},
wsLink,
authLink.concat(httpLink)
)
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
ReactDOM.render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>

, document.getElementById('root'))