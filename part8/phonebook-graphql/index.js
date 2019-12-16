const { ApolloServer} = require('apollo-server')
const {model: User} = require('./model/User')
const jwt = require('jsonwebtoken')
const {SECRET} = require('./utils/config')
const schema = require('./graphql/schema')
const BookApi = require('./data-source/book.api')
const AuthorApi = require('./data-source/author.api')
const UserApi = require('./data-source/user.api')
const {model : Book} = require('./model/Book')
const {model: Author} = require('./model/Author')
const {MONGODB_URI} = require('./utils/config')
const mongoose = require('mongoose')

if(mongoose.connection.readyState !== 1){
    mongoose.set('useFindAndModify', false)
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connect mongoose')
}
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

