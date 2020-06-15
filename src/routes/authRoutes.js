const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const signKey = require('../../sign-key')

router.post('/signup', async (req, res) => {
    console.log('SIGNUP')
    const { email, password, streamUser } = req.body
    try {
        const user = new User({ email, password, streamUser: streamUser ? streamUser : email})
        await user.save()
        const token = jwt.sign({ userId: user._id }, signKey)
        res.send({ token })
    } catch(err) {
        return res.status(422).send({ error: 'Signup failed' })
    }
})

router.post('/signin', async (req, res) => {
    console.log('SIGNIN')
    const { email, password } = req.body
    if( !email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: 'Forbidden' })
    }
    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id }, signKey)
        res.send({ token, streamUser: user.streamUser ? user.streamUser : '' })
    } catch(err) {
        return res.status(422).send({ error: 'Forbidden' })
    }
})

module.exports = router
