const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schemaDefinition = {
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    bookCount: {
        type: Number,
    }
}

const schema = new mongoose.Schema(schemaDefinition)
schema.plugin(uniqueValidator)


module.exports = {model: mongoose.model('Author', schema), schemaDefinition}