const { MongoDataSource } = require('apollo-datasource-mongodb')
class BookApi extends MongoDataSource {
    async getAllBooks(authorName, genre) {
        const books = await this.model.find({}).populate('author')
        return books.filter(book => (!authorName || book.author.name === authorName) && (!genre || book.genres.includes(genre)))
    }

    async createBook(book, author){
        if(!book || !author) return null
        try{
            const newBook = await this.model.create({ ...book, author: author._id })
            const newBookObj = {...newBook.toObject(), author}
            return newBookObj
        }catch(exception){
            throw exception
        }
    }
    async getBookCount(){
        const bookCount = await this.model.countDocuments()
        return bookCount
    }
}

module.exports = BookApi