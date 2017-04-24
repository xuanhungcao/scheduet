const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    owner: String,
    description: String,
    begin: mongoose.Schema.Types.Number, //timestamp
    end: mongoose.Schema.Types.Number, //timestamp
    priority: mongoose.Schema.Types.Number, //0: normal, 1: critical, 2: do or die
    type: String, //user defines
    other: mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('notes', noteSchema)
