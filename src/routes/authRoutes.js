const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = new User({ email, password })
        await user.save()
        res.send('POST request User')
    } catch(err) {
        return res.status(422).send(err.message)
    }
})

module.exports = router
