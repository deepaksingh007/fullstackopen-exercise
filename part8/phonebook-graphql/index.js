const { ApolloServer} = require('apollo-server')
const User = require('./model/User')
const jwt = require('jsonwebtoken')
const {SECRET} = require('./utils/config')
const schema = require('./graphql/schema')
const BookApi = require('./data-source/book.api')
const AuthorApi = require('./data-source/author.api')
const UserApi = require('./data-source/user.api')
const Book = require('./model/Book')
const Author = require('./model/Author')


const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.toLowerCase().startsWith('bearer ')){
            const decodedToken = jwt.verify(auth.substring(7), SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return {currentUser}
        }
    },
    dataSources: () => ({
        bookApi: new BookApi(Book),
        authorApi: new AuthorApi(Author),
        userApi: new UserApi(User)
    })
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Server ready at ${subscriptionsUrl}`)
})

