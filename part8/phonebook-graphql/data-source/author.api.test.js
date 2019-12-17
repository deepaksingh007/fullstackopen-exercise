const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const AuthorApi = require('./author.api')
const {schemaDefinition} = require('../model/Author')
const authorSchema = mongoose.Schema(schemaDefinition)
const AuthorForTest = mongoose.model('AuthorForTest', authorSchema)
const {authorsMock} = require('../model/_test/authorsMock')
exports.authorApiMock = {
    ...(new AuthorApi(AuthorForTest)),
    getAllAuthors: jest.fn(),
    getAuthorByName: jest.fn(),
    incrementBookCount: jest.fn(),
    createAuthor: jest.fn(),
    updateAuthorBorn: jest.fn()
}

describe('book api', ()=>{
    let authorApi
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
        authorApi = new AuthorApi(AuthorForTest)
    })
    describe('getAllAuthors', () => {
        test('getAllAuthors', async () => {
            mockingoose(AuthorForTest).toReturn(authorsMock, 'find')
            const actual = await authorApi.getAllAuthors()
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(authorsMock)
        })
    })
    describe('getAuthorByName', () => {
        test('getAuthorByName', async () => {
            mockingoose(AuthorForTest).toReturn(
                query => {
                    return authorsMock.find(author => author.name === query.getQuery().name)
                }, 'findOne'
            )
            const actual = await authorApi.getAuthorByName('test 1')
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(authorsMock[0])
        })
    })
    describe('incrementBookCount', () => {
        test('incrementBookCount', async () => {
            mockingoose(AuthorForTest)
                .toReturn(
                    query => {
                        return authorsMock.find(author => author.name === query.getQuery().name)
                    }, 'findOne'
                )
            mockingoose(AuthorForTest).toReturn( query => {
                expect(query.bookCount).toBe(authorsMock[0].bookCount + 1)
            }, 'save')
            const actual = await authorApi.incrementBookCount('test 1')
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject({...authorsMock[0], bookCount: authorsMock[0].bookCount + 1})
        })
        test('incrementBookCount with error', async() => {
            const error = new Error('invalid data')
            mockingoose(AuthorForTest)
                .toReturn(
                    query => {
                        return authorsMock.find(author => author.name === query.getQuery().name)
                    }, 'findOne'
                )
            mockingoose(AuthorForTest).toReturn(error, 'save')
            await expect(authorApi.incrementBookCount('test 1')).rejects.toEqual(error)
        } )
    })
    describe('createAuthor', () => {
        test('createAuthor with valid data', async () => {
            mockingoose(AuthorForTest).toReturn( query => {
                const newAuthor = {
                    _id : query._id,
                    name: query.name,
                    born: query.born,
                    bookCount: query.bookCount,
                    __v: query.__v
                }
                console.log(newAuthor)
                return newAuthor
            }, 'save')
            const actual = await authorApi.createAuthor(authorsMock[0])
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(authorsMock[0])
        })
        test('createAuthor with error', async() => {
            const error = new Error('invalid data')
            mockingoose(AuthorForTest).toReturn(error, 'save')
            await expect(authorApi.createAuthor(authorsMock[0])).rejects.toEqual(error)
        } )
    })


})