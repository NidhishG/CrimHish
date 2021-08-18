const mongoose = require('mongoose');

const levelling = new mongoose.Schema({
  guildID: { type: String },
  life: { type: Boolean, default: true},
  send: { type: Boolean, default: true},
  rankrole: { type: Array }
});

module.exports = mongoose.model('levelling', levelling);