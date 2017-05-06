const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    owner: String,
    studentId: Number,
    title: String,
    description: String,
    start: String, //timestamp
    end: String, //timestamp
    allDay: mongoose.Schema.Types.Boolean,
    repeat: mongoose.Schema.Types.Array,
    endRepeat: mongoose.Schema.Types.String,
    other: mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('events', noteSchema)
