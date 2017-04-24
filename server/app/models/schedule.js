const mongoose = require('mongoose')

let scheduleSchema = mongoose.Schema({
    owner: String,
    day: mongoose.Schema.Types.Number,
    subject: String,
    other: mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('schedules', scheduleSchema)
