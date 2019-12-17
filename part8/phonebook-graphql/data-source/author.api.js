const { MongoDataSource } = require('apollo-datasource-mongodb')
class AuthorApi extends MongoDataSource {
    async getAllAuthors() {
        const authors = await this.model.find({})
        return authors
    }
    async getAuthorByName(name){
        if(!name) return null
        const author = await this.model.findOne({name})
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
            throw exception
        }
    }
    async createAuthor(author){
        if(!author) return null
        try{
            const newAuthor = new this.model(author)
            await newAuthor.save()
            return newAuthor
        }catch(exception){
            throw exception
        }
    }
    async updateAuthorBorn(name, born){
        if(!name) return null
        const author = await this.model.findOne({name})
        if(author){
            author.born = born
            author.save()
            return author
        }
        else {
            return null
        }
    }
}

module.exports = AuthorApi