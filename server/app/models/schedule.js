const mongoose = require('mongoose')

let scheduleSchema = mongoose.Schema({
    info: mongoose.Schema.Types.Mixed,
    module: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('schedules', scheduleSchema)
