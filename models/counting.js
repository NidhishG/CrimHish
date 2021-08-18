const { Schema, model } = require('mongoose');

let schema = new Schema({
  guild: String,
    channel: String,
    amount: {
        type: Number,
        default: 0,
    },
    lastPerson: {
        type: String,
        default: null
    },
})

module.exports = model('counting', schema)