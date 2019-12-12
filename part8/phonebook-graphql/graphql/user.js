const {  gql, UserInputError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const typeDef=gql`
extend type Query{
  me: User
}
extend type Mutation {
  createUser(
    username: String!
    favoriteGenre: String!
    ): User
  login(
    username: String!
    password: String!
  ): Token
}
  type User{
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
`
const resolver = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        createUser: async(root, args, context) => {
            const {dataSources} = context
            try{
                const user = await dataSources.userApi.createUser({...args})
                return user
            }catch(exception){
                throw new UserInputError(exception.message, { invalidArgs: args })
            }
        },
        login: async(root, args, context) => {
            const {dataSources} = context
            const user = await dataSources.userApi.getUserByUserName(args.username)
            if(user && args.password === 'admin'){
                const userInfo = {
                    username: user.username,
                    id: user._id
                }
                return {value: jwt.sign(userInfo, SECRET)}
            }else{
                throw new UserInputError('wrong credentials')
            }
        }  
    },
}
module.exports = {typeDef, resolver}
