const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')
const fs = require('fs')
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

router.get('/getstreamie', async (req, res) => {
    console.log('GETSTREAMIE')
    try {
        const data = await fs.readFileSync('/slot/home/w3b/streamie/teststream.conf', 'utf8')
        const raw = data.split('\n')
        const streamUser = raw[0].split(' ')[1]
        const youtubeKey = raw[3].split('/')[4].split(';')[0]
        const facebookKey = raw[4].split('/')[4].split(';')[0]
        const twitchKey = raw[5].split('/')[4].split(';')[0]
        return res.send({
            streamUser, youtubeKey, twitchKey, facebookKey
        })
    } catch(err) {
        return res.status(422).send({ error: err.message })
    }
    //return res.send('getstreamie finished')
})

router.post('/putstreamie', async (req, res) => {
    const {
        streamUser,
        youtube, youtubeActive,
        twitch, twitchActive,
        facebook, facebookActive
    } = req.body
    try {
        const nginxConf =
`application ${streamUser} {
    live on;
    record off;
    ${youtubeActive ? '' : '#'}push rtmp://a.rtmp.youtube.com/live2/${youtube};
    ${facebookActive ? '' : '#'}push rtmp://localhost:19350/rtmp/${facebook};
    ${twitchActive ? '' : '#'}push rtmp://live-ams.twitch.tv/app/${twitch};
}`
        console.log(nginxConf)
    } catch(err) {
        return res.status(422).send({ error: err.message })
    }
    return res.send('streamie update')
})

module.exports = router
