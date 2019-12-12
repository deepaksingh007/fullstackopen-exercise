const mongoose = require('mongoose')
const {MONGODB_URI} = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')


const schema = new mongoose.Schema({
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
})
schema.plugin(uniqueValidator)
if(mongoose.connection.readyState !== 1){
    mongoose.set('useFindAndModify', false)
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connect mongoose')
}

module.exports = mongoose.model('Book', schema)