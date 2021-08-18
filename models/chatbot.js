const mongoose = require('mongoose');

const chatbot = new mongoose.Schema({
  _id: { type: String },
  channel: { type: String },
});

module.exports = mongoose.model('chatbot', chatbot);
