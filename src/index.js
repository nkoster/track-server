const port = 3333
const express = require('express')
const mongoUri = require('../mongo')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', _ => {
    console.log('connected to mongodb')
})

mongoose.connection.on('error', err => {
    console.error(err)
})

const app = express()

app.use(authRoutes)

app.get('/', (_, res) => {
    res.send('hellow')
})

app.listen(port, _ => {
    console.log(`listening to ${port}`)
})
