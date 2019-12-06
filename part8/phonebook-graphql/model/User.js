const mongoose = require('mongoose');
const {MONGODB_URI} = require('../utils/config');
const uniqueValidator = require('mongoose-unique-validator')


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
});

userSchema.plugin(uniqueValidator)

const User = mongoose.model('LibraryUser', userSchema);
if(mongoose.connection.readyState !== 1){
    mongoose.set('useFindAndModify', false);
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true });
}
module.exports = User;