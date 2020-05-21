const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/signup', (req, res) => {
    console.log(req.body)
    res.send('POST request Apekop')
})

module.exports = router
