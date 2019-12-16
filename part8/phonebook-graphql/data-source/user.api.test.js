const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const UserApi = require('./user.api')
const {schemaDefinition} = require('../model/User')
const userSchema = mongoose.Schema(schemaDefinition)
const UserForTest = mongoose.model('UserForTest', userSchema)
const {userMock} = require('../model/_test/userMock')
UserForTest.schema.path('author', Object)
exports.userApiMock = {
    ...(new UserApi(UserForTest)),
    createUser: jest.fn(),
    getUserByUserName: jest.fn(),
}
describe('user api', () => {
    let userApi
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
        userApi = new UserApi(UserForTest)
    })
    describe('createUser', () => {
        test('createUser', async () => {
            const newUser = {
                username: 'test',
                favoriteGenre: 'classic',
            }
            mockingoose(UserForTest).toReturn(newUser, 'save'
            )
            const actual = await userApi.createUser(newUser)
            expect(JSON.parse(JSON.stringify(actual))).toMatchObject(newUser)
        })
        test('createUser with error', async () => {
            const newUser = {
                username: 'test',
                favoriteGenre: 'classic',
            }
            const error = new Error('invalid data')
            mockingoose(UserForTest).toReturn(error, 'save'
            )
            await expect(userApi.createUser(newUser)).rejects.toEqual(error)
        })
        describe('getUserByUserName', () => {
            test('getUserByUserName', async () => {
                mockingoose(UserForTest).toReturn(userMock, 'findOne')
                const actual = await userApi.getUserByUserName('test')
                expect(JSON.parse(JSON.stringify(actual))).toMatchObject(userMock)
            })
        })
    })
})
