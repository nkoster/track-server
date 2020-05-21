const port = 3333

const express = require('express')

const mongoUri = require('../mongo')

const mongoose = require('mongoose')

const app = express()

app.get('/', (_, res) => {
    res.send('hellow')
})

app.listen(port, _ => {
    console.log(`listening to ${port}`)
})
