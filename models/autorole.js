const mongoose = require('mongoose');

const autorole = new mongoose.Schema({
  guild: { type: String },
  role: { type: String },
});

module.exports = mongoose.model('autorole', autorole)