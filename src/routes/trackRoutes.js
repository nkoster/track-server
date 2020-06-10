const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id })
    res.send(tracks)
    console.log('TRACKS')
})

router.post('/track', async (req, res) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const { name, locations, distance, duration } = req.body
    console.log('TRACK')
    if (!name || !locations) {
        return res.status(422).send({ error: 'Not enough data'})
    }
    try {
        const track = new Track({ name, locations, distance, duration, userId: req.user._id })
        await track.save()
        await sleep(500)
        res.send(track)
    } catch(err) {
        res.status(422).send({ error: err.message })
    }
})

router.post('/delete', async (req, res) => {
    console.log('DELETE')
    try {
        await Track.deleteOne({ _id: req.body.id })
    } catch(err) {
        return res.status(422).send({ error: err.message })
    }
    return res.send('track deleted')
})

router.post('/getstreamie', async (req, res) => {
    console.log('GETSTREAMY')
    try {
        await console.log('reading NGINX')
    } catch(err) {
        return res.status(422).send({ error: err.message })
    }
    return res.send('getstreamie finished')
})

module.exports = router
