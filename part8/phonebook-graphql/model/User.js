const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schemaDefinition = {
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3,
    },
    favoriteGenre: {
        type: String,
    }
}
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3,
    },
    favoriteGenre: {
        type: String,
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('LibraryUser', userSchema)

module.exports = {model: User, schemaDefinition}