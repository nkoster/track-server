const express = require('express')

const router = express.Router()

router.post('/signup', (_, res) => {
    res.send('POST request Apekop')
})

module.exports = router
