const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();

// middleware to verify user using jwt
const auth = async (req, res, next) => {
    console.log("succc")

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id})

        if (!user) {
            throw new Error()
        }
        console.log("succc")
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
