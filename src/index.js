const port = 3333
require('./models/User')
require('./models/Track')
const express = require('express')
const mongoUri = require('../mongo')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middleware/requireAuth')

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

app.use(bodyParser.json()) // must be first
app.use(authRoutes)
app.use(trackRoutes)

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
})

app.listen(port, _ => {
    console.log(`listening to ${port}`)
})
