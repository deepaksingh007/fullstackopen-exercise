
const { gql, UserInputError, AuthenticationError, PubSub} = require('apollo-server')
const pubSub = new PubSub()

const typeDef=gql`
extend type Query {
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
}
extend type Mutation {
  addBook(title: String!
    author: String!
    published: Int!
    genres: [String!]!): Book
}
extend type Subscription {
  bookAdded: Book!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}
`
const resolver = {
    Query: {
        bookCount: (root, args, {dataSources}) => dataSources.bookApi.getBookCount(),
        allBooks: async (root, args, { dataSources}) => {
            const books = await dataSources.bookApi.getAllBooks(args.author, args.genre)
            return books
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const {currentUser, dataSources} = context
            const {bookApi, authorApi} = dataSources
            if(!currentUser) {throw new AuthenticationError('not authenticated')}
            try {
                let author = await authorApi.getAuthorByName(args.author)
                if (author) {
                    author = await authorApi.incrementBookCount(args.author)
                }
                else {
                    author = await authorApi.createAuthor({ name: args.author, born: null, bookCount: 1 })
                }
                const book = await bookApi.createBook({ ...args}, author)
                pubSub.publish('BOOK_ADDED', { bookAdded: book })
                return book
            } catch (exception) {
                throw new UserInputError(exception.message, { invalidArgs: args })
            }

        }, 
    },
    Subscription:{
        bookAdded: {subscribe: () => {
            const iterator = pubSub.asyncIterator(['BOOK_ADDED'])
            return iterator
        }}
    }
}
module.exports = {typeDef, resolver}
