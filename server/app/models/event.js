const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    owner: String,
    description: String,
    begin: mongoose.Schema.Types.Number, //timestamp
    end: mongoose.Schema.Types.Number, //timestamp
    priority: mongoose.Schema.Types.Number, //0: normal, 1: critical, 2: do or die
    title: String, //user defines
    location: String,
    allDay: mongoose.Schema.Types.Boolean,
    weekRepeating: mongoose.Schema.Types.Boolean,
})

module.exports = mongoose.model('events', noteSchema)
