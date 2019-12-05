const mongoose = require('mongoose')
const {MONGODB_URI} = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
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
})
schema.plugin(uniqueValidator)
if(mongoose.connection.readyState !== 1){
  mongoose.set('useFindAndModify', false);
  mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connect mongoose')
}

module.exports = mongoose.model('Author', schema)