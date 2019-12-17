const {ApolloServer, gql} = require('apollo-server')
const schema = require('./graphql/schema')
const contextResolver = require('./graphql/context')
const {userApiMock} = require('./data-source/user.api.test')
const {bookApiMock} = require('./data-source/book.api.test')
const {authorApiMock} = require('./data-source/author.api.test')
const {createTestClient} = require('apollo-server-testing')
const {authorsMock} = require('./model/_test/authorsMock')
const {booksMock, booksPopulatedMock} = require('./model/_test/booksMock')
const {userMock} = require('./model/_test/userMock')

const ALL_AUTHORS = gql`{
  allAuthors{
    name
    born
    bookCount
  }
}`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author{
      name
    }
    published
    genres
  }
`
const ALL_BOOKS = gql`
{
  allBooks{
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const BOOKS_BY_GENRE = gql`
query bookByGenre($genre: String){
  allBooks(genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const SET_BORN = gql`
mutation editBorn($name: String!, $born: Int!){
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author{
      name
    }
  }
}`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

describe('server', () => {
    beforeEach(
        () => {
            jest.clearAllMocks()
        }
    )
    describe('queries', () => {
        const server = new ApolloServer({
            schema,
            context: () => ({currentUser: userMock}),
            dataSources: ()  => ({
                userApi: userApiMock,
                bookApi: bookApiMock,
                authorApi: authorApiMock
            })
        })
        const {query} = createTestClient(server)
        describe('getAllAuthors', () => {
            test('get all authors', async () => {

                authorApiMock.getAllAuthors.mockReturnValueOnce(authorsMock)
                const response = await query({query: ALL_AUTHORS})
                const expected = authorsMock.map(({bookCount, born, name}) => ({bookCount, name, born}))
                expect(response.data.allAuthors).toMatchObject(expected)
            })
        })
        describe('getAllBooks', () => {
            test('get all books', async () => {
                bookApiMock.getAllBooks.mockReturnValueOnce(booksPopulatedMock)
                const response = await query({query: ALL_BOOKS})
                const expected = booksPopulatedMock.map(({title, author, published, genres}) => ({title, author: {name: author.name}, genres, published}))
                expect(response.data.allBooks).toMatchObject(expected)
            })
            test('get books by genre', async () => {
                bookApiMock.getAllBooks.mockImplementationOnce((author, genre) => booksPopulatedMock.filter(
                    book => book.genres.includes(genre)
                ))
                const response = await query({query: BOOKS_BY_GENRE, variables: {genre: 'classic'}})
                const expected = booksPopulatedMock
                    .filter(book => book.genres.includes('classic'))
                    .map(({title, author, published, genres}) => ({title, author: {name: author.name}, genres, published}))
                expect(response.data.allBooks).toMatchObject(expected)
            })
        })

    })
    describe('mutations', () => {
        const server = new ApolloServer({
            schema,
            context: () => ({currentUser: userMock}),
            dataSources: ()  => ({
                userApi: userApiMock,
                bookApi: bookApiMock,
                authorApi: authorApiMock
            })
        })
        const {mutate} = createTestClient(server)
        describe('addBook', () => {
            test('add book for existing author', async () => {
                authorApiMock.getAuthorByName.mockReturnValueOnce(authorsMock[0])
                authorApiMock.incrementBookCount.mockReturnValueOnce({...authorsMock[0], bookCount: authorsMock[0].bookCount + 1})
                bookApiMock.createBook.mockImplementationOnce( (book, author) => ({...book, author}))
                const {title, author, published, genres} = booksMock[0]
                const response = await mutate({mutation: CREATE_BOOK, variables: {title, author, published, genres}})
                expect(response.data.addBook).toMatchObject({title, author: {name: authorsMock[0].name}})
            })
            test('add book for non-existing author', async () => {
                authorApiMock.getAuthorByName.mockReturnValueOnce(null)
                authorApiMock.createAuthor.mockReturnValueOnce(authorsMock[0])
                bookApiMock.createBook.mockImplementationOnce( (book, author) => ({...book, author}))
                const {title, author, published, genres} = booksMock[0]
                const response = await mutate({mutation: CREATE_BOOK, variables: {title, author, published, genres}})
                expect(response.data.addBook).toMatchObject({title, author: {name: authorsMock[0].name}})
            })
        })

        describe('setBorn', () => {
            test('edit born year of author', async () => {
                authorApiMock.updateAuthorBorn.mockImplementationOnce((name, born) => ({...authorsMock[0], born}))
                const response = await mutate({mutation: SET_BORN, variables: {name: authorsMock[0].name ,born: 1999}})
                const expected = {name: authorsMock[0].name, born: 1999}
                expect(response.data.editAuthor).toMatchObject(expected)
            })
        })
        describe('login', () => {
            test('login with correct password', async() =>{
                userApiMock.getUserByUserName.mockReturnValueOnce(userMock)
                const response = await mutate({mutation: LOGIN, variables: {username: userMock.username, password: 'admin'}})
                expect(response.data.login).toBeTruthy()
            })
            test('login with incorrect password', async() => {
                userApiMock.getUserByUserName.mockReturnValueOnce(userMock)
                const response = await mutate({mutation: LOGIN, variables: {username: userMock.username, password: 'wrong password'}})
                expect(response.errors).toBeTruthy()
                expect(response.data.login).toBeFalsy()
            })
        })
    })
})

