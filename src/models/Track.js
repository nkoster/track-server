const mongoose = require('mongoose')

const pointsSchema = mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})

const trackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    distance: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    locations: [ pointsSchema ]
})

mongoose.model('Track', trackSchema)
