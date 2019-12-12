const {typeDef : AuthorType, resolver: authorResolver} = require('./author')
const {typeDef : BookType, resolver: bookResolver} = require('./book')
const {typeDef : UserType, resolver: userResolver} = require('./user')
const {merge} = require('lodash')
const { gql, makeExecutableSchema} = require('apollo-server')

const Query = gql`
  type Query {
    _empty: String

  }
`
const Mutation = gql`  
type Mutation {
  _empty: String
}
`
const Subscription= gql`
type Subscription {
  _empty: String
}
`
const resolvers = {
    Query: {
    },
    Mutation: {
    },
    Subscription:{
    }
}

module.exports = makeExecutableSchema({typeDefs: [Query, Mutation, Subscription, BookType, AuthorType, UserType], resolvers: merge(resolvers, bookResolver, authorResolver, userResolver)})