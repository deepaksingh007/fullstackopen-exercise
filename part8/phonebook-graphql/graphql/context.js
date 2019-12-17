const {model: User} = require('../model/User')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

exports.contextResolver = async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
        const decodedToken = jwt.verify(auth.substring(7), SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return {currentUser}
    }
}