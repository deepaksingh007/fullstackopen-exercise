const {AuthenticationError, UserInputError} = require('apollo-server')
const {  gql} = require('apollo-server')
const typeDef = gql`
extend type Query{
  authorCount: Int!
  allAuthors: [Author!]!
}
extend type Mutation {
  editAuthor(name: String!
    setBornTo: Int): Author
}
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}`
const resolver = {
    Query: {
        authorCount: (root, args, {dataSources}) => dataSources.authorApi.getAuthorCount(),
        allAuthors: (root, args, {dataSources}) => dataSources.authorApi.getAllAuthors(),
    },
    Mutation: {
        editAuthor: async (root, args, context) => {
            const {currentUser, dataSources} = context
            const {authorApi} = dataSources
            if(!currentUser) {throw new AuthenticationError('not authenticated')}
            try {
                const { name, setBornTo } = args
                const author = await authorApi.getAuthorByName(name)
                if(author){
                    author.born = setBornTo
                    await author.save()
                    return author
                }
                else {return null}
            } catch (exception) {
                throw new UserInputError(exception.message, { invalidArgs: args })
            }
        }, 
    },
}
module.exports = {typeDef, resolver}
