const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const signKey = require('../../sign-key')

router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = new User({ email, password })
        await user.save()
        const token = jwt.sign({ userId: user._id }, signKey)
        res.send({ token })
    } catch(err) {
        return res.status(422).send(err.message)
    }
})

module.exports = router
