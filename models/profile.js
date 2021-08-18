const mongoose = require('mongoose')

const GuildProfiles = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  total_xp: {
    type: Number,
    required: true,
  },
  last_message: {
    type: Number,
    required: true,
  },
  rankrole: {
    type: Array,
  },
  levelchannel: {
    type: String,
  }
})

module.exports = mongoose.model("xpstuff", GuildProfiles);