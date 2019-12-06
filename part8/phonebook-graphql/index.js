const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./model/Book')
const Author = require('./model/Author')
const User = require('./model/User')
const jwt = require('jsonwebtoken')
const {SECRET} = require('./utils/config')
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User{
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!
    author: String!
    published: Int!
    genres: [String!]!): Book
    editAuthor(name: String!
      setBornTo: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
      ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        const books = await Book.find({}).populate('author')
        return books.filter(book => (args.author === undefined || book.author === args.author) && (args.genre === undefined || book.genres.includes(args.genre)))
      } catch (exception) {
        throw exception
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {throw new AuthenticationError("not authenticated")}
      try {
        let author = await Author.findOne({ name: args.author })
        console.log('author', author)
        if (author) {
          author.bookCount = author.bookCount + 1
        }
        else {
          author = new Author({ name: args.author, born: null, bookCount: 1 })
        }
        await author.save()
        const book = await new Book({ ...args, author: author._id }).save()
        book.author = author
        return book
      } catch (exception) {
        throw new UserInputError(exception.message, { invalidArgs: args })
      }

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {throw new AuthenticationError("not authenticated")}
        try {
          const { name, setBornTo } = args
          const author = await Author.findOne({ name })
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
      createUser: async(root, args) => {
        try{
          const user = new User({...args})
          await user.save()
          return user
        }catch(exception){
          throw new UserInputError(exception.message, { invalidArgs: args })
        }
      },
      login: async(root, args) => {
          const user = await User.findOne({username: args.username})
          if(user && args.password === 'admin'){
            const userInfo = {
              username: user.username,
              id: user._id
            }
            return {value: jwt.sign(userInfo, SECRET)}
          }else{
            throw new UserInputError("wrong credentials")
          }
      }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    try{
      const auth = req ? req.headers.authorization : null
      if(auth && auth.toLowerCase().startsWith('bearer ')){
        const decodedToken = jwt.verify(auth.substring(7), SECRET);
        const currentUser = await User.findById(decodedToken.id)
        return {currentUser}
      }
    }catch(exception){
      throw new UserInputError(exception.message, { invalidArgs: args })
    }
  }
})

const countBooks = (author) => {
  const bookCount = books.reduce((acc, cur) => {
    return cur.author === author.name ? acc + 1 : acc
  }, 0)
  return { ...author, bookCount }
}
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

