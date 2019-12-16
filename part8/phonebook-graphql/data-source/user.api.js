const { MongoDataSource } = require('apollo-datasource-mongodb')

class UserApi extends MongoDataSource {
    async createUser(user){
        if(!user) return null
        try{
            const newUser = new this.model(user)
            await newUser.save()
            return newUser
        }catch(exception){
            throw exception
        }    
    }
    async getUserByUserName(username){
        if(!username) return null
        const user = await this.model.findOne({username})
        return user
    }
}

module.exports = UserApi