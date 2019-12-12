const { MongoDataSource } = require('apollo-datasource-mongodb')
class BookApi extends MongoDataSource {
    async getAllBooks(author, genre) {
        const books = await this.model.find({}).populate('author')
        console.log(books)
        return books.filter(book => (!author || book.author === author) && (!genre || book.genres.includes(genre)))
    }

    async createBook(book, author){
        if(!book || !author) return null
        try{
            const newBook = await new this.model({ ...book, author: author._id }).save()
            newBook.author = author
            return newBook
        }catch(exception){
            return exception
        }
    }
    async getBookCount(){
        const bookCount = await this.model.collection.countDocuments()
        return bookCount
    }
}

module.exports = BookApi