const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const BookApi = require('./book.api')
const {schemaDefinition} = require('../model/Book')
const bookSchema = mongoose.Schema(schemaDefinition)
const BookForTest = mongoose.model('BookForTest', bookSchema)
const {booksMock, booksPopulatedMock} = require('../model/_test/booksMock')
BookForTest.schema.path('author', Object)
exports.bookApiMock = {
    ...(new BookApi(BookForTest)),
    getAllBooks: jest.fn(),
    createBook: jest.fn(),
    getBookCount: jest.fn()
}

describe('book api', ()=>{
    let bookApi
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
        bookApi = new BookApi(BookForTest)
        BookForTest.schema.path('author', Object)
    })
    describe('getAllBooks', () => {
        test('getAllBooks without authors', async () => {
            mockingoose(BookForTest).toReturn(booksMock, 'find')
            const actual = await bookApi.getAllBooks()
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(booksMock)
        })

        test('getAllBooks with author', async () => {
            const bookApi = new BookApi(BookForTest)
            BookForTest.schema.path('author', Object)
            mockingoose(BookForTest).toReturn(booksPopulatedMock, 'find')
            const actual = await bookApi.getAllBooks('test 1')
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject([booksPopulatedMock[0], booksPopulatedMock[1]])
        })
        test('getAllBooks with genre', async () => {
            mockingoose(BookForTest).toReturn(booksPopulatedMock, 'find')
            const actual = await bookApi.getAllBooks(undefined, 'crime')
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject([booksPopulatedMock[2]])
        })
    })

    describe('createNewBook',  () => {
        const book = {
            title: 'test',
            author: 'author',
            published: 1989,
            genres: ['classic']
        }
        const author = {
            _id: '5df39b9aff493b398829c8a4',
            name: 'author'
        }
        test('add a book with valid data', async () => {
            const expected = {...book, _id: '5df39b9aff493b398829c8a5', author}
            mockingoose(BookForTest).toReturn(expected, 'save'
            )
            const actual = await bookApi.createBook(book, author)
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(expected)
        })
        test('error is thrown when invalid data comes', async () => {
            const error = new Error('invalid data')
            mockingoose(BookForTest).toReturn(error, 'save')
            await expect(bookApi.createBook(book, author)).rejects.toEqual(error)
        })
    })

    describe('countDocuments', () => {
        test('countDocuments', async () => {
            mockingoose(BookForTest).toReturn(11, 'countDocuments')
            const actual = await bookApi.getBookCount()
            expect(actual).toBe(11)
        })
    })

})