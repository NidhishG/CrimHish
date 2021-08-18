const mongoose = require('mongoose');

const Guild = new mongoose.Schema({
  guildID: {
    type: String
  },
  Prefix: {
    type: String
  }
});

module.exports = mongoose.model('Guild', Guild);