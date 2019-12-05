const { ApolloServer, gql, UserInputError } = require('apollo-server')
const Book = require('./model/Book')
const Author = require('./model/Author')
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

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!
    author: String!
    published: Int!
    genres: [String!]!): Book
    editAuthor(name: String!
      setBornTo: Int): Author
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
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
      }   
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

