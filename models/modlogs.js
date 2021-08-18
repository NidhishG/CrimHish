const mongoose = require('mongoose');

const modlogs = new mongoose.Schema({
  _id: { type: String },
  channel: { type: String },
});

module.exports = mongoose.model('modlogs', modlogs);
