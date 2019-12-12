require('dotenv').config()
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
const PORT = process.env.PORT || 3003
const SECRET = process.env.SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}