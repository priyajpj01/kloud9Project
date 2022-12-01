const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config=require('../helper/config')

// middleware to verify user using jwt
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.secretKey)
        const user = await User.findOne({ _id: decoded._id})

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate by adding token in your request' })
    }
}

module.exports = auth
