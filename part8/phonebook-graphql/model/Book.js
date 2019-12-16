const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schemaDefinition = {
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genres: [
        { type: String}
    ]
}
const schema = new mongoose.Schema(schemaDefinition)
schema.plugin(uniqueValidator)


module.exports = {model: mongoose.model('Book', schema), schemaDefinition}