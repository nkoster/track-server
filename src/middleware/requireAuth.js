const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const signKey = require('../../sign-key')

module.exports = (req, res, next) =>  {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).send({ error: 'Not allowed' })
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, signKey, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'Not allowed' })
        }
        const { userId } = payload
        const user = await User.findById(userId)
        req.user = user
        next()
    })
}
