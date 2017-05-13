const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    owner: String,
    studentId: Number,
    title: String,
    description: String,
    start: String, //timestamp
    end: String, //timestamp
    allDay: mongoose.Schema.Types.Boolean,
    repeat: mongoose.Schema.Types.Mixed,
    endRepeat: mongoose.Schema.Types.String,
    other: mongoose.Schema.Types.Mixed,
    color: String,
    modules: mongoose.Schema.Types.Mixed,
    editable: mongoose.Schema.Types.Boolean,
})

module.exports = mongoose.model('event2s', noteSchema)

