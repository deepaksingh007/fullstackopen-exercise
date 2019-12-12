const { MongoDataSource } = require('apollo-datasource-mongodb')
class AuthorApi extends MongoDataSource {
    async getAllAuthors() {
        const authors = await this.model.find({})
        return authors
    }
    async getAuthorByName(name){
        console.log(name)
        if(!name) return null
        const author = await this.model.findOne({name})
        console.log(author)
        return author
    }
    async incrementBookCount(name){
        if(!name) return null
        try{
            let author = await this.model.findOne({ name})
            if (author) {
                author.bookCount = author.bookCount + 1
                await author.save()
                return author
            }
            else {
                return null
            }
        }catch(exception){
            return exception
        }
    }
    async createAuthor(author){
        if(!author) return null
        try{
            const newAuthor = new this.model(author)
            await newAuthor.save()
            return newAuthor
        }catch(exception){
            return exception
        }
    }
}

module.exports = AuthorApi